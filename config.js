// 1. 静态配置区域

const enable = true;

// 倍率阈值设置
const lowRateThreshold = 1.0; // 小于等于此值为"标准节点"
const highRateLimit = 5.0;    // 小于等于此值为"高倍率"，大于此值为"极高倍率"

// 分流开关
const ruleOptions = {
  apple: true,
  microsoft: true,
  github: true,
  google: true,
  openai: true,
  spotify: true,
  youtube: true,
  bahamut: true,
  netflix: true,
  tiktok: true,
  disney: true,
  pixiv: true,
  hbo: true,
  'media-cn@!cn': true,
  biliintl: true,
  tvb: true,
  hulu: true,
  primevideo: true,
  telegram: true,
  line: true,
  whatsapp: true,
  games: true,
  japan: true,
  ads: true,
};

// 2. DNS 配置 (防泄露)

const domesticNameservers = [
  "https://223.5.5.5/dns-query",
  "https://doh.pub/dns-query"
];
const foreignNameservers = [
  "https://208.67.222.222/dns-query",
  "https://77.88.8.8/dns-query",
  "https://1.1.1.1/dns-query",
  "https://8.8.4.4/dns-query",
];

const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": false,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    "+.lan", "+.local", "+.msftconnecttest.com", "+.msftncsi.com",
    "localhost.ptlogin2.qq.com", "localhost.sec.qq.com",
    "+.in-addr.arpa", "+.ip6.arpa", "time.*.com", "time.*.gov",
    "pool.ntp.org", "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "1.2.4.8"],
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers],
  "direct-nameserver": [...domesticNameservers],
  "nameserver-policy": {
    "geosite:private,cn": domesticNameservers
  }
};

// 3. 规则与地区定义

const rules = [
  'RULE-SET,applications,下载软件',
  'PROCESS-NAME,SunloginClient,DIRECT', 'PROCESS-NAME,SunloginClient.exe,DIRECT',
  'PROCESS-NAME,AnyDesk,DIRECT', 'PROCESS-NAME,AnyDesk.exe,DIRECT',
  'PROCESS-NAME,节点小宝,DIRECT', 'PROCESS-NAME,nblink.exe,DIRECT',
  'DOMAIN-SUFFIX,iepose.com,DIRECT', 'DOMAIN-SUFFIX,ionewu.com,DIRECT',
];

// 地区列表 (正则匹配顺序执行，最后的 OT小众地区 为兜底)
const regionDefinitions = [
  { name: 'HK香港', regex: /港|🇭🇰|hk|hongkong|hong kong/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png' },
  { name: 'US美国', regex: /^(?!.*aus|.*速度慢|.*手动选)(?=.*(美|🇺🇸|us(?!t)|usa|american|united states)).*/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png' },
  { name: 'JP日本', regex: /日本|🇯🇵|jp|japan/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png' },
  { name: 'KR韩国', regex: /韩|🇰🇷|kr|korea/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Korea.png' },
  { name: 'SG新加坡', regex: /新加坡|🇸🇬|sg|singapore/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png' },
  { name: 'CN中国大陆', regex: /中国|🇨🇳|cn|china/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China_Map.png' },
  { name: 'TW台湾', regex: /台湾|🇹🇼|tw|taiwan|tai wan/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png' },
  { name: 'GB英国', regex: /英|🇬🇧|uk|united kingdom|great britain/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_Kingdom.png' },
  { name: 'DE德国', regex: /德国|🇩🇪|de|germany/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Germany.png' },
  { name: 'MY马来西亚', regex: /马来|🇲🇾|my|malaysia/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Malaysia.png' },
  { name: 'TK土耳其', regex: /土耳其|🇹🇷|tk|turkey/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Turkey.png' },
  { name: 'CA加拿大', regex: /加拿大|🇨🇦|ca|canada/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Canada.png' },
  { name: 'AU澳大利亚', regex: /澳大利亚|🇦🇺|au|australia|sydney/i, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Australia.png' },
  // 兜底规则：匹配所有剩余节点
  { name: 'OT其他', regex: /.*/, icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/World_Map.png' }
];

const ruleProviderCommon = { type: 'http', format: 'yaml', interval: 86400 };
const groupBaseOption = { interval: 300, timeout: 3000, url: 'http://cp.cloudflare.com/generate_204', lazy: true, 'max-failed-times': 3, hidden: false };

const ruleProviders = {
  applications: { ...ruleProviderCommon, behavior: 'classical', format: 'text', url: 'https://github.com/DustinWin/ruleset_geodata/raw/refs/heads/mihomo-ruleset/applications.list', path: './ruleset/DustinWin/applications.list' }
};

// 倍率提取正则
const multiplierRegex = /((?<=[xX✕✖⨉倍率])([0-9]+(\.[0-9]+)?))|(([0-9]+(\.[0-9]+)?)(?=[xX✕✖⨉倍率]))/i;

const serviceConfigs = [
  { key: 'openai', name: '国外AI', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/ChatGPT.png', url: 'https://chat.openai.com/cdn-cgi/trace', rules: ['GEOSITE,jetbrains-ai,国外AI', 'GEOSITE,category-ai-!cn,国外AI', 'GEOSITE,category-ai-chat-!cn,国外AI', 'DOMAIN-SUFFIX,meta.ai,国外AI', 'DOMAIN-SUFFIX,meta.com,国外AI'] },
  { key: 'youtube', name: 'YouTube', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png', url: 'https://www.youtube.com/s/desktop/494dd881/img/favicon.ico', rules: ['GEOSITE,youtube,YouTube'] },
  { key: 'media-cn@!cn', name: '港澳台媒体', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TVB.png', url: 'https://viu.tv/', rules: ['GEOSITE,tvb,港澳台媒体', 'GEOSITE,hkt,港澳台媒体', 'RULE-SET,hk-media,港澳台媒体'], provider: { key: 'hk-media', url: 'https://ruleset.skk.moe/List/non_ip/stream_hk.conf', path: './ruleset/hk-media/hk-media.mrs', format: 'text', behavior: 'classical' } },
  { key: 'biliintl', name: '哔哩哔哩东南亚', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/bilibili_3.png', url: 'https://www.bilibili.tv/', rules: ['GEOSITE,biliintl,哔哩哔哩东南亚'] },
  { key: 'bahamut', name: '巴哈姆特', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Bahamut.png', url: 'https://ani.gamer.com.tw/ajax/getdeviceid.php', rules: ['GEOSITE,bahamut,巴哈姆特'] },
  { key: 'disney', name: 'Disney+', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Disney+.png', url: 'https://disney.api.edge.bamgrid.com/devices', rules: ['GEOSITE,disney,Disney+'] },
  { key: 'netflix', name: 'NETFLIX', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Netflix.png', url: 'https://api.fast.com/netflix/speedtest/v2?https=true', rules: ['GEOSITE,netflix,NETFLIX'] },
  { key: 'tiktok', name: 'Tiktok', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TikTok.png', url: 'https://www.tiktok.com/', rules: ['GEOSITE,tiktok,Tiktok'] },
  { key: 'spotify', name: 'Spotify', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Spotify.png', url: 'http://spclient.wg.spotify.com/signup/public/v1/account', rules: ['GEOSITE,spotify,Spotify'] },
  { key: 'pixiv', name: 'Pixiv', icon: 'https://play-lh.googleusercontent.com/8pFuLOHF62ADcN0ISUAyEueA5G8IF49mX_6Az6pQNtokNVHxIVbS1L2NM62H-k02rLM=w240-h480-rw', url: 'http://spclient.wg.spotify.com/signup/public/v1/account', rules: ['GEOSITE,pixiv,Pixiv'] },
  { key: 'hbo', name: 'HBO', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/HBO.png', url: 'https://www.hbo.com/favicon.ico', rules: ['GEOSITE,hbo,HBO'] },
  { key: 'tvb', name: 'TVB', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TVB.png', url: 'https://www.tvb.com/logo_b.svg', rules: ['GEOSITE,tvb,TVB'] },
  { key: 'primevideo', name: 'Prime Video', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Prime_Video.png', url: 'https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png', rules: ['GEOSITE,primevideo,Prime Video'] },
  { key: 'hulu', name: 'Hulu', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hulu.png', url: 'https://auth.hulu.com/v4/web/password/authenticate', rules: ['GEOSITE,hulu,Hulu'] },
  { key: 'telegram', name: 'Telegram', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png', url: 'http://www.telegram.org/img/website_icon.svg', rules: ['GEOIP,telegram,Telegram'] },
  { key: 'whatsapp', name: 'WhatsApp', icon: 'https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png', url: 'https://web.whatsapp.com/data/manifest.json', rules: ['GEOSITE,whatsapp,WhatsApp'] },
  { key: 'line', name: 'Line', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Line.png', url: 'https://line.me/page-data/app-data.json', rules: ['GEOSITE,line,Line'] },
  { key: 'games', name: '游戏专用', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Game.png', rules: ['GEOSITE,category-games@cn,国内网站', 'GEOSITE,category-games,游戏专用'] },
  { key: 'ads', name: '广告过滤', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png', rules: ['GEOSITE,category-ads-all,广告过滤', 'RULE-SET,adblockmihomo,广告过滤'], provider: { key: 'adblockmihomo', url: 'https://github.com/217heidai/adblockfilters/raw/refs/heads/main/rules/adblockmihomo.mrs', path: './ruleset/adblockfilters/adblockmihomo.mrs', format: 'mrs', behavior: 'domain' }, reject: true },
  { key: 'apple', name: '苹果服务', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple_2.png', url: 'http://www.apple.com/library/test/success.html', rules: ['GEOSITE,apple-cn,苹果服务'] },
  { key: 'google', name: '谷歌服务', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png', url: 'http://www.google.com/generate_204', rules: ['GEOSITE,google,谷歌服务'] },
  { key: 'github', name: 'Github', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/GitHub.png', url: 'https://github.com/robots.txt', rules: ['GEOSITE,github,Github'] },
  { key: 'microsoft', name: '微软服务', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png', url: 'http://www.msftconnecttest.com/connecttest.txt', rules: ['GEOSITE,microsoft@cn,国内网站', 'GEOSITE,microsoft,微软服务'] },
  { key: 'japan', name: '日本网站', icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/JP.png', url: 'https://r.r10s.jp/com/img/home/logo/touch.png', rules: ['RULE-SET,category-bank-jp,日本网站', 'GEOIP,jp,日本网站,no-resolve'], provider: { key: 'category-bank-jp', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-bank-jp.mrs', path: './ruleset/MetaCubeX/category-bank-jp.mrs', format: 'mrs', behavior: 'domain' } }
];

// 4. 程序入口

function main(config) {
  if (!enable) return config;

  const proxies = config?.proxies || [];
  const proxyCount = proxies.length;
  const proxyProviderCount = typeof config?.['proxy-providers'] === 'object' ? Object.keys(config['proxy-providers']).length : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error('配置文件中未找到任何代理');
  }

  config['allow-lan'] = true;
  config['bind-address'] = '*';
  config['mode'] = 'rule';
  config['dns'] = dnsConfig;
  config['profile'] = { 'store-selected': true, 'store-fake-ip': true };
  config['unified-delay'] = true;
  config['tcp-concurrent'] = true;
  config['keep-alive-interval'] = 1800;
  config['find-process-mode'] = 'strict';
  config['geodata-mode'] = true;
  config['geodata-loader'] = 'memconservative';
  config['geo-auto-update'] = true;
  config['geo-update-interval'] = 24;

  config['sniffer'] = {
    enable: true,
    'force-dns-mapping': true,
    'parse-pure-ip': false,
    'override-destination': true,
    sniff: { TLS: { ports: [443, 8443] }, HTTP: { ports: [80, '8080-8880'] }, QUIC: { ports: [443, 8443] } },
    'skip-src-address': ['10.0.0.0/8', '127.0.0.1/32', '172.16.0.0/12', '192.168.0.0/16', 'fc00::/7'],
    'force-domain': ['+.google.com', '+.googleapis.com', '+.googleusercontent.com', '+.youtube.com', '+.facebook.com', '+.messenger.com', '+.fbcdn.net', 'fbcdn-a.akamaihd.net'],
    'skip-domain': ['Mijia Cloud', '+.oray.com'],
  };

  config['ntp'] = { enable: true, 'write-to-system': false, server: 'cn.ntp.org.cn' };
  config['tun'] = {
    stack: 'mixed',
    'auto-route': true,
    'strict-route': true,
    'exclude-interface': ['NodeBabyLink'],
    'route-exclude-address': ['10.0.0.0/8', '127.0.0.1/32', '172.16.0.0/12', '192.168.0.0/16', 'fc00::/7'],
  };
  config['geox-url'] = {
    geoip: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat',
    geosite: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat',
    mmdb: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb',
    asn: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb',
  };

  config.proxies.push({ name: '直连', type: 'direct', udp: true });

  // 代理分组初始化：分级存储 (Standard, High, Extreme)
  const regionGroups = {};
  regionDefinitions.forEach(r => regionGroups[r.name] = { 
    ...r, 
    proxies: { low: [], high: [], extreme: [] } 
  });
  
  const allLowRateProxies = [];

  // 遍历所有节点
  for (let i = 0; i < proxyCount; i++) {
    const proxy = proxies[i];
    const name = proxy.name;
    
    // 倍率获取
    let multiplier = 1.0;
    const match = multiplierRegex.exec(name);
    if (match) {
        const numStr = match[0].replace(/[xX✕✖⨉倍率]/g, '');
        if(numStr && !isNaN(numStr)) multiplier = parseFloat(numStr);
    }

    // 地区匹配
    for (const region of regionDefinitions) {
      if (region.regex.test(name)) {
        if (multiplier <= lowRateThreshold) {
            regionGroups[region.name].proxies.low.push(name);
            allLowRateProxies.push(name);
        } else if (multiplier <= highRateLimit) {
            regionGroups[region.name].proxies.high.push(name);
        } else {
            regionGroups[region.name].proxies.extreme.push(name);
        }
        break; // 匹配到地区即停止，最后的"小众地区"会兜底
      }
    }
  }

  const generatedRegionGroups = [];
  
  // 生成策略组
  regionDefinitions.forEach(r => {
    const groupData = regionGroups[r.name];
    const { low, high, extreme } = groupData.proxies;

    // 1. 标准分组 (仅包含低倍率)
    if (low.length > 0) {
        generatedRegionGroups.push({
            ...groupBaseOption,
            name: r.name,
            type: 'url-test',
            tolerance: 50,
            icon: r.icon,
            proxies: low
        });
    }

    // 2. 高倍率分组
    if (high.length > 0) {
        generatedRegionGroups.push({
            ...groupBaseOption,
            name: `${r.name}-高倍率`,
            type: 'url-test',
            tolerance: 50,
            icon: r.icon,
            proxies: high
        });
    }

    // 3. 极高倍率分组
    if (extreme.length > 0) {
        generatedRegionGroups.push({
            ...groupBaseOption,
            name: `${r.name}-极高倍率`,
            type: 'select', // 极高倍率通常建议手动选择，避免误跑
            icon: r.icon,
            proxies: extreme
        });
    }
  });

  const allRegionGroupNames = generatedRegionGroups.map(g => g.name);
  
  if (allLowRateProxies.length > 0) {
      generatedRegionGroups.push({
          ...groupBaseOption,
          name: '低倍率合集',
          type: 'url-test',
          tolerance: 100,
          icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Donate.png',
          proxies: allLowRateProxies
      });
      allRegionGroupNames.push('低倍率合集');
  }

  // 功能策略组
  const functionalGroups = [];

  functionalGroups.push({
    ...groupBaseOption,
    name: '默认节点',
    type: 'select',
    proxies: [...allRegionGroupNames, '直连'],
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Proxy.png',
  });

  serviceConfigs.forEach(svc => {
    if (ruleOptions[svc.key]) {
      rules.push(...svc.rules);
      if (svc.provider) {
        ruleProviders[svc.provider.key] = {
          ...ruleProviderCommon,
          behavior: svc.provider.behavior,
          format: svc.provider.format,
          url: svc.provider.url,
          path: svc.provider.path
        };
      }

      const groupProxies = svc.reject 
        ? ['REJECT', '直连', '默认节点']
        : ['默认节点', ...allRegionGroupNames, '直连'];

      functionalGroups.push({
        ...groupBaseOption,
        name: svc.name,
        type: 'select',
        proxies: groupProxies,
        url: svc.url,
        icon: svc.icon
      });
    }
  });

  rules.push(
    'GEOSITE,private,DIRECT',
    'GEOIP,private,DIRECT,no-resolve',
    'GEOSITE,cn,国内网站',
    'GEOIP,cn,国内网站,no-resolve',
    'MATCH,其他外网'
  );

  functionalGroups.push({
    ...groupBaseOption,
    name: '下载软件',
    type: 'select',
    proxies: ['直连', 'REJECT', '默认节点', '国内网站', ...allRegionGroupNames],
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Download.png',
  }, {
    ...groupBaseOption,
    name: '其他外网',
    type: 'select',
    proxies: ['默认节点', '国内网站', ...allRegionGroupNames],
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Streaming!CN.png',
  }, {
    ...groupBaseOption,
    name: '国内网站',
    type: 'select',
    proxies: ['直连', '默认节点', ...allRegionGroupNames],
    url: 'http://wifi.vivo.com.cn/generate_204',
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/StreamingCN.png',
  });

  config['proxy-groups'] = [
    ...functionalGroups,
    ...generatedRegionGroups
  ];

  config['rules'] = rules;
  config['rule-providers'] = ruleProviders;

  return config;
}
