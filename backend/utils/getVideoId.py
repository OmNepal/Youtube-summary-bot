import re

def getVideoId(url):
   pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
   match = re.search(pattern, url)
   
   return match.group(1) if match else None