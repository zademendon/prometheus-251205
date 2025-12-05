// get url parameters
const urlParams = new URLSearchParams(window.location.search)

// log url parameters
for (const [key, value] of urlParams) {
  console.log(key, value)
}

// set gclid, if available
let gclid
if (urlParams.get('gclid')) gclid = urlParams.get('gclid')
else if (localStorage.getItem('pro_gclid')) gclid = localStorage.getItem('pro_gclid')

// write cookie
if (gclid && !localStorage.getItem('pro_gclid')) {
  localStorage.setItem('pro_gclid', gclid)
}

// insert gclid in links to app subdomain
if (gclid) {
  const targetSubdomain = 'app.hathr.ai'
  const links = document.querySelectorAll('a')

  links.forEach(link => {
    if (link.href.includes('gclid=')) return;
    if (link.hostname !== targetSubdomain) return;

    const url = new URL(link.href, location.href);
    url.searchParams.set('gclid', gclid);
    link.href = url.toString();
  })
}
