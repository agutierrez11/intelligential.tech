import os
import sys
import json
import time
import urllib.request
import pandas as pd

# Firecrawl API script for SOFOM enrichment
FIRECRAWL_API_KEY = os.getenv('FIRECRAWL_API_KEY', '')

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

def main():
    print("=== FIRECRAWL SOFOM ENRICHMENT ENGINE ===")
    api_key = FIRECRAWL_API_KEY
    if not api_key:
        api_key = input("Ingresa tu API Key de Firecrawl (fc-...): ").strip()
    
    if not api_key:
        print("Error: No Firecrawl API key provided.")
        sys.exit(1)
        
    csv_path = r"c:\Users\Antonio\.gemini\antigravity-ide\scratch\intelligential\data\pipeline_real_sofomes_mx.csv"
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found at {csv_path}")
        sys.exit(1)
        
    df = pd.read_csv(csv_path)
    print(f"Loaded {len(df)} SOFOMes from dataset.")
    
    # Process sample/top entries
    processed = 0
    for idx, row in df.head(10).iterrows():
        nombre = str(row.get('denominacion_social_real', '')).split(',')[0]
        query = f"SOFOM {nombre} Mexico portal"
        print(f"[{idx+1}/10] Buscando con Firecrawl: {query}...")
        
        res = search_firecrawl(query, api_key)
        if res and res.get('success') and res.get('data'):
            top_result = res['data'][0]
            site_url = top_result.get('url', '')
            snippet = top_result.get('description', '')
            print(f"   ✔ URL encontrada: {site_url}")
            processed += 1
        time.sleep(0.5)

    print(f"\n✔ Proceso de prueba finalizado. {processed} entidades enriquecidas exitosamente.")

if __name__ == '__main__':
    main()
