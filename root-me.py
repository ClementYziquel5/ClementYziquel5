import requests
from bs4 import BeautifulSoup

def get_rootme_points(username):
    url = f'https://www.root-me.org/{username}?inc=score&lang=fr'
    response = requests.get(url)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        content = soup.find('div', class_='tile')
        
        if content:
            content = content.text.strip()
            # Supprimer lignes vides et espaces
            content = '\n'.join([line for line in content.splitlines() if line.strip()])
            content = content.split('\n')
            Ellzee = {
                'Points': int(content[3].replace('\xa0', '')),
                'Classement': int(content[1].replace('\xa0', '')),
            }
            return Ellzee
        else:
            return "Points not found on the page."
    else:
        return f"Failed to retrieve data. Status code: {response.status_code}"
    
def replace_tags(Ellzee):
    with open('README.md', 'r', encoding='utf-8') as f:
        content = f.read()
        
        content = content.replace('<#rootmePoints>', str(Ellzee['Points']))
        content = content.replace('<#rootmeRank>', str(Ellzee['Classement']))

        with open('README.md', 'w', encoding='utf-8') as f:
            f.write(content)
            f.close()


def main():
    username = 'Ellzee'
    
    Ellzee = get_rootme_points(username)        
    
    print(f"Username: {username}")
    print(f"Points: {Ellzee['Points']}")
    print(f"Classement: {Ellzee['Classement']}")

    replace_tags(Ellzee)

if __name__ == "__main__":
    main()
