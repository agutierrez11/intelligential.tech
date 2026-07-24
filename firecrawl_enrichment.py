import os
import sys
import json
import time
import urllib.request
import pandas as pd

FIRECRAWL_API_KEY = os.getenv('FIRECRAWL_API_KEY', 'fc-a826332a3caa44278ce22953865de09a')

def search_firecrawl(query, api_key):
    url = "https://api.firecrawl.dev/v1/search"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = json.dumps({
        "query": query,
        "limit": 3
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            return res_data
    except Exception as e:
        print(f"Error calling Firecrawl for '{query}': {e}")
        return None

def detect_tech_stack(url, snippet):
    combined = (str(url) + " " + str(snippet)).lower()
    if 'dynamicore' in combined:
        return 'DynamiCore (Detectado)'
    elif 'softcredito' in combined or 'softcrédito' in combined:
        return 'Softcrédito (Detectado)'
    elif 'ascendes' in combined:
        return 'Ascendes (Detectado)'
    elif 'mambu' in combined:
        return 'Mambu (Detectado)'
    elif 'aws' in combined or 'amazon' in combined:
        return 'AWS In-House (Detectado)'
    else:
        return 'Sistema Legado In-House'

def main():
    print("=== FIRECRAWL SOFOM ENRICHMENT ENGINE ===")
    api_key = FIRECRAWL_API_KEY
    if not api_key:
        print("Error: No Firecrawl API key provided.")
        sys.exit(1)
        
    csv_path = r"c:\Users\Antonio\.gemini\antigravity-ide\scratch\intelligential\data\pipeline_real_sofomes_mx.csv"
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found at {csv_path}")
        sys.exit(1)
        
    df = pd.read_csv(csv_path)
    print(f"Loaded {len(df)} SOFOMes from dataset.")
    
    if 'sitio_web_oficial' not in df.columns:
        df['sitio_web_oficial'] = ''
        
    processed = 0
    max_to_process = 30  # Batch size
    
    for idx, row in df.head(max_to_process).iterrows():
        nombre_raw = str(row.get('denominacion_social_real', '')).split(',')[0]
        query = f"SOFOM {nombre_raw} Mexico portal credito"
        print(f"[{idx+1}/{max_to_process}] Buscando con Firecrawl: {query}...")
        
        res = search_firecrawl(query, api_key)
        if res and res.get('success') and res.get('data'):
            top_result = res['data'][0]
            site_url = top_result.get('url', '')
            snippet = top_result.get('description', '')
            
            stack = detect_tech_stack(site_url, snippet)
            df.at[idx, 'sitio_web_oficial'] = site_url
            df.at[idx, 'competidor_actual'] = stack
            
            print(f"   [OK] URL: {site_url}")
            print(f"   [OK] Tech Stack: {stack}")
            processed += 1
        time.sleep(0.2)

    # Save updated CSV
    df.to_csv(csv_path, index=False)
    print(f"\n[OK] Enriquecimiento completado. {processed} entidades guardadas en {csv_path}.")

if __name__ == '__main__':
    main()
