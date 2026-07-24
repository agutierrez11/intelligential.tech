import os
import sys
import json
import time
import urllib.request
import pandas as pd

FIRECRAWL_API_KEY = os.getenv('FIRECRAWL_API_KEY', 'fc-a826332a3caa44278ce22953865de09a')

def search_firecrawl(query, api_key, limit=10):
    url = "https://api.firecrawl.dev/v1/search"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = json.dumps({
        "query": query,
        "limit": limit
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            return res_data
    except Exception as e:
        print(f"Error searching Firecrawl for '{query}': {e}")
        return None

def main():
    print("=== CONSTRUCCION DE LISTAS REALES: LEASING MAQUINARIA, LENDERS DIGITALES & LOOKALIKES ===")
    api_key = FIRECRAWL_API_KEY

    # 1. SEARCH LEASING MAQUINARIA & EQUIPO EN MÉXICO
    print("\n--- 1. Extrayendo Arrendadoras de Maquinaria & Equipo Industrial en Mexico ---")
    queries_leasing = [
        "arrendadoras de maquinaria pesada mexico leasing",
        "arrendamiento de equipo industrial mexico leasing sofom",
        "arrendamiento medico equipo hospitalario mexico sofom"
    ]
    
    leasing_list = []
    for q in queries_leasing:
        print(f"Buscando: {q}...")
        res = search_firecrawl(q, api_key, limit=12)
        if res and res.get('success') and res.get('data'):
            for item in res['data']:
                url = item.get('url', '')
                title = item.get('title', '')
                desc = item.get('description', '')
                if 'gob.mx' not in url and 'wikipedia' not in url and 'facebook' not in url:
                    leasing_list.append({
                        'nicho': 'Leasing Maquinaria & Equipo',
                        'denominacion': title.split('|')[0].split('-')[0].strip(),
                        'sitio_web': url,
                        'descripcion': desc,
                        'categoria': 'Arrendamiento Heavy Equipment / Industrial'
                    })
        time.sleep(0.3)

    # 2. SEARCH LENDERS DIGITALES & FINTECHS EN MÉXICO
    print("\n--- 2. Extrayendo Lenders Digitales & Fintechs de Crédito en Mexico ---")
    queries_lenders = [
        "lenders digitales credito pyme mexico fintech",
        "plataformas de credito digital pyme mexico sofom",
        "fintech credito empresarial mexico"
    ]
    
    lenders_list = []
    for q in queries_lenders:
        print(f"Buscando: {q}...")
        res = search_firecrawl(q, api_key, limit=12)
        if res and res.get('success') and res.get('data'):
            for item in res['data']:
                url = item.get('url', '')
                title = item.get('title', '')
                desc = item.get('description', '')
                if 'gob.mx' not in url and 'wikipedia' not in url and 'facebook' not in url:
                    lenders_list.append({
                        'nicho': 'Lenders Digitales / Fintechs',
                        'denominacion': title.split('|')[0].split('-')[0].strip(),
                        'sitio_web': url,
                        'descripcion': desc,
                        'categoria': 'Crédito Digital Pyme / Fintech'
                    })
        time.sleep(0.3)

    # Convert to DataFrames and Save CSVs
    df_leasing = pd.DataFrame(leasing_list).drop_duplicates(subset=['sitio_web'])
    df_lenders = pd.DataFrame(lenders_list).drop_duplicates(subset=['sitio_web'])

    df_leasing.to_csv(r"c:\Users\Antonio\.gemini\antigravity-ide\scratch\intelligential\data\lista_real_leasing_maquinaria.csv", index=False)
    df_lenders.to_csv(r"c:\Users\Antonio\.gemini\antigravity-ide\scratch\intelligential\data\lista_real_lenders_digitales.csv", index=False)

    print(f"\n[OK] Lista Real de Leasing Maquinaria creada con {len(df_leasing)} entidades reales.")
    print(f"[OK] Lista Real de Lenders Digitales creada con {len(df_lenders)} entidades reales.")

if __name__ == '__main__':
    main()
