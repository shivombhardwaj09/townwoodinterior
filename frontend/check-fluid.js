fetch('https://townwoodhomes.com').then(r=>r.text()).then(async t => {
  const scripts = [...t.matchAll(/src="([^"]+\.js[^"]*)"/g)].map(m => m[1]);
  for (const src of scripts) {
    const url = src.startsWith('http') ? src : 'https://townwoodhomes.com' + (src.startsWith('/') ? src : '/' + src);
    try {
      const js = await fetch(url).then(r=>r.text());
      const m = js.match(/.{0,200}SPLAT_COLOR.{0,200}/i);
      if (m) {
        console.log('Found SPLAT config in:', url);
        console.log(m[0]);
      } else {
        const m2 = js.match(/.{0,200}webgl-fluid.{0,200}/i) || js.match(/BLOOM_INTENSITY/i);
        if (m2) {
            console.log('Found webgl-fluid in:', url);
            const idx = js.indexOf(m2[0]);
            console.log(js.substring(Math.max(0, idx - 200), idx + 400));
        }
      }
    } catch(e){}
  }
})
