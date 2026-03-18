export default function addFontInHeadTag(fontID) {
  if (!fontID || fontID === 'Computer+Modern+Serif') {
    return;
  }
  const head = document.getElementsByTagName('head')[0];
  if (document.getElementById(fontID)) {
    return;
  }
  const link = document.createElement('link');
  link.id = fontID;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = `https://fonts.googleapis.com/css?family=${fontID}:wght@100;300;400;500;600;700;900`;
  link.media = 'all';
  head.appendChild(link);
}
