// Cloudflare Workers 论坛后端 — 纯标准 API，无第三方依赖
const APP_HTML = "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n<title>梦鱼资源 - 分享技术、资源、心得与生活见闻。</title>\n<style>\n*{margin:0;padding:0;box-sizing:border-box}\n:root{--bg:#f5f6f8;--card:#fff;--text:#222;--muted:#888;--primary:#16a34a;--border:#e5e7eb;--danger:#dc2626;--input-bg:#fff;--hl:#f0fdf4}\n[data-theme=dark]{--bg:#0d1117;--card:#161b22;--text:#e6edf3;--muted:#a0aab5;--primary:#3fb950;--border:#30363d;--danger:#f85149;--input-bg:#0d1117;--hl:#0d2818}\nbody{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,\"PingFang SC\",\"Microsoft YaHei\",sans-serif;font-size:15px;max-width:1100px;margin:0 auto;min-height:100vh}\nheader{position:sticky;top:0;z-index:10;background:var(--card);border-bottom:1px solid var(--border);padding:10px 16px;display:flex;align-items:center;justify-content:space-between}\nheader .logo{font-size:18px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0}\n@media(max-width:640px){header .logo{font-size:15px}}\nheader .user{font-size:13px;color:var(--muted);display:flex;gap:8px;align-items:center}\nheader .user button{background:none;border:1px solid var(--border);border-radius:8px;padding:5px 10px;font-size:13px;cursor:pointer;color:var(--text);white-space:nowrap;flex-shrink:0}\n.hnav{cursor:pointer;font-size:14px;color:var(--muted);white-space:nowrap;padding:4px 6px}\n.hnav:hover{color:var(--primary)}\n@media(max-width:640px){.hnav{font-size:12px;padding:4px 2px}}\n.umenu{position:absolute;top:100%;right:0;background:var(--card);border:1px solid var(--border);border-radius:10px;min-width:140px;box-shadow:0 8px 24px rgba(0,0,0,.25);z-index:50;overflow:hidden;display:none}\n.umenu.open{display:block}\n.umenu div{padding:10px 14px;cursor:pointer;font-size:14px;white-space:nowrap}\n.umenu div:hover{background:var(--hover)}\n.umenu div.danger{color:#ef4444}\n.hnav{cursor:pointer;font-size:13px;padding:6px 8px;border-radius:8px;white-space:nowrap;flex-shrink:0}\n.hnav:hover{background:var(--hl)}\n@media(max-width:640px){.hnav{font-size:12px;padding:6px 4px}}\nmain{padding:12px 12px 80px}\n.card{background:var(--card);border-radius:12px;padding:14px 16px;margin-bottom:10px;border:1px solid var(--border)}\n.board{display:flex;justify-content:space-between;align-items:center;cursor:pointer;padding:12px 0;border-bottom:1px solid var(--border)}\n.board:last-child{border-bottom:none}\n.board .nm{font-size:16px;font-weight:600}\n.board .ds{font-size:13px;color:var(--muted);margin-top:4px}\n.board .meta{font-size:12px;color:var(--muted);text-align:right;white-space:nowrap;margin-left:8px}\n.thread{display:block;cursor:pointer;padding:12px 0;border-bottom:1px solid var(--border)}\n.thread:last-child{border-bottom:none}\n.thread .ti{font-size:15px;font-weight:600}\n.thread .ti .pin{color:var(--primary);font-size:12px;border:1px solid var(--primary);border-radius:4px;padding:1px 5px;margin-right:6px}\n.thread .mt{font-size:12px;color:var(--muted);margin-top:6px;display:flex;gap:10px}\n.post{padding:16px;border-bottom:1px solid var(--border);background:var(--card);border-radius:12px;margin-bottom:12px;border:1px solid var(--border)}\n.post:last-child{margin-bottom:0}\n.post .ph{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)}\n.post .ph .author-info{display:flex;align-items:center;gap:10px}\n.post .ph .author-info img{width:40px;height:40px;border-radius:50%;object-fit:cover}\n.post .ph .author-info .avatar-letter{width:40px;height:40px;border-radius:50%;background:var(--primary);color:#fff;font-size:18px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;margin:0}\n.post .ph .author-meta{display:flex;flex-direction:column;gap:2px}\n.post .ph .au{color:var(--primary);font-weight:700;font-size:15px}\n.post .ph .author-sub{font-size:12px;color:var(--muted)}\n.post .ph .floor{font-size:13px;color:var(--muted);background:var(--bg);padding:4px 10px;border-radius:20px;font-weight:600}\n.post .pc{white-space:pre-wrap;word-break:break-word;line-height:1.9;font-size:15px;color:var(--text)}\n.post .pc pre{background:#0d1117;border:1px solid var(--border);border-radius:8px;padding:12px;overflow-x:auto;margin:10px 0;font-size:13px;line-height:1.6}\n.post .pc blockquote{border-left:3px solid var(--primary);margin:10px 0;padding:8px 14px;background:var(--bg);border-radius:0 8px 8px 0;color:var(--muted);font-size:14px}\n.post .pc .quote-head{background:var(--bg);border:1px solid var(--border);border-bottom:none;border-radius:8px 8px 0 0;padding:8px 14px;font-size:13px;color:var(--text);margin:10px 0 0}\n.post .pc .quote-head + blockquote{margin-top:0;border-radius:0 0 8px 0}\n.post .ops{margin-top:12px;padding-top:10px;border-top:1px solid var(--border);display:flex;gap:8px;align-items:center}\n.post .ops button{background:var(--bg);border:1px solid var(--border);border-radius:20px;font-size:13px;cursor:pointer;padding:6px 14px;color:var(--muted);transition:all .2s}\n.post .ops button:hover{border-color:var(--primary);color:var(--primary)}\n.post .ops button.like.on{color:#e11d48;border-color:#e11d48;font-weight:700;background:#fff1f2}\n.op-post{border-left:3px solid var(--primary)}\n.solution-post{border:2px solid #16a34a;background:linear-gradient(to bottom,var(--hl),var(--card))}\nh2.tt{font-size:18px;margin-bottom:4px}\ntextarea,input[type=text],input[type=password]{width:100%;border:1.5px solid var(--border);border-radius:10px;padding:10px 12px;font-size:15px;margin-bottom:10px;background:var(--input-bg);color:var(--text);outline:none;transition:border-color .15s}\ntextarea:focus,input[type=text]:focus,input[type=password]:focus{border-color:var(--primary);box-shadow:0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)}\n[data-theme=dark] textarea,[data-theme=dark] input[type=text],[data-theme=dark] input[type=password]{border-color:#3d444d}\nselect{width:100%;border:1.5px solid var(--border);border-radius:10px;padding:10px 12px;font-size:15px;margin-bottom:10px;background:var(--input-bg);color:var(--text)}\ntextarea{min-height:100px;resize:vertical}\n.btn{background:var(--primary);color:#fff;border:none;border-radius:10px;padding:10px 18px;font-size:15px;cursor:pointer;width:100%}\n.btn.ghost{background:var(--card);color:var(--text);border:1.5px solid var(--border)}\n.fab{display:none}\n#modal{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:100;display:none;align-items:flex-start;justify-content:center;padding-top:15vh}\n#modal.show{display:flex}\n#modal .box{background:var(--card);border-radius:14px;padding:20px;width:88%;max-width:380px}\n#modal .box h3{margin-bottom:14px;padding-right:28px}\n#modal .box{position:relative}\n#modal .x{position:absolute;top:12px;right:14px;font-size:20px;color:var(--muted);cursor:pointer;line-height:1;padding:4px}\n#modal .x:hover{color:var(--text)}\n.skel{border-radius:8px;background:linear-gradient(90deg,var(--border) 25%,var(--card) 50%,var(--border) 75%);background-size:200% 100%;animation:skel 1.2s infinite}\n@keyframes skel{0%{background-position:200% 0}100%{background-position:-200% 0}}\n#modal .box .row{display:flex;gap:10px}\n.hint{font-size:13px;color:var(--muted);text-align:center;padding:30px 0}\n.err{color:var(--danger);font-size:13px;margin:-4px 0 10px;min-height:18px}\n.toolbar{display:flex;gap:8px;margin-bottom:10px}\n.toolbar .btn{width:auto;padding:8px 14px;font-size:14px}\n.admin-tag{font-size:11px;color:#fff;background:var(--primary);border-radius:4px;padding:1px 5px;margin-left:4px}\n.post .pc img{max-width:100%;border-radius:8px;margin:8px 0;display:block}\n.post .pc .mention{color:var(--primary);font-weight:600;background:var(--hl);border-radius:4px;padding:0 4px}\n.post .ops button.danger{color:var(--danger)}\n.searchbar{display:flex;gap:8px;margin-bottom:10px}\n.searchbar input{margin-bottom:0}\n.searchbar .btn{width:auto;white-space:nowrap}\n.bell{position:relative;cursor:pointer;font-size:18px}\n.bell .dot{position:absolute;top:-4px;right:-6px;background:#e11d48;color:#fff;font-size:10px;min-width:16px;height:16px;border-radius:8px;text-align:center;line-height:16px;padding:0 4px}\n.notif{padding:10px 0;border-bottom:1px solid var(--border);font-size:14px;cursor:pointer}\n.notif:last-child{border-bottom:none}\n.notif.unread{background:var(--hl);border-radius:8px;padding:10px}\n.notif .tm{font-size:12px;color:var(--muted);margin-top:4px}\n.upbar{display:flex;gap:8px;align-items:center;margin-bottom:10px}\n.upbar input[type=file]{display:none}\n.edtools{display:flex;gap:4px;margin-bottom:8px;flex-wrap:wrap}\n.edtools button{background:var(--bg);border:1px solid var(--border);border-radius:8px;min-width:34px;height:32px;font-size:14px;cursor:pointer;color:var(--text);padding:0 8px}\n.edtools button:active{background:var(--border)}\n.emoji-picker{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:8px;margin-bottom:8px;max-height:180px;overflow-y:auto;line-height:1}\n/* 图片灯箱 */\n#lightbox{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:200;display:none;align-items:center;justify-content:center}\n#lightbox.show{display:flex}\n#lightbox img{max-width:92vw;max-height:88vh;border-radius:8px}\n#lightbox .lb-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;color:#fff;font-size:28px;width:48px;height:48px;border-radius:50%;cursor:pointer}\n#lightbox .lb-prev{left:16px}\n#lightbox .lb-next{right:16px}\n#lightbox .lb-close{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.15);border:none;color:#fff;font-size:20px;width:40px;height:40px;border-radius:50%;cursor:pointer}\n#lightbox .lb-count{position:absolute;bottom:20px;color:#fff;font-size:14px}\n/* @自动补全 */\n.at-list{position:absolute;background:var(--card);border:1px solid var(--border);border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,.15);z-index:150;max-height:200px;overflow-y:auto;min-width:180px}\n.at-item{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;font-size:14px}\n.at-item:hover,.at-item.on{background:var(--bg)}\n/* 权限隐藏块 */\n.hide-lock{background:var(--bg);border:1.5px dashed var(--border);border-radius:10px;padding:14px;text-align:center;color:var(--muted);font-size:14px;margin:8px 0}\n.hide-show{background:var(--hl);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin:8px 0}\n.hide-show .hide-tag{font-size:12px;color:var(--muted);margin-bottom:6px}\n/* 统计横条 */\n.stat-bar{display:flex;gap:16px;justify-content:center;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:12px;margin-bottom:12px;font-size:13px;color:var(--muted);flex-wrap:wrap}\n.stat-bar b{color:var(--primary);font-size:16px;margin-right:4px}\n/* 侧边栏布局 */\n.layout{max-width:1100px;margin:0 auto;display:flex;gap:16px;padding:0 12px;align-items:flex-start}\n.layout main{flex:1;min-width:0;padding:12px 0 80px}\n#sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;max-height:calc(100vh - 90px);overflow-y:auto;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:8px;display:none}\n.layout.has-sidebar #sidebar{display:block}\n.layout.sidebar-collapsed #sidebar{display:none}\n.sb-board{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:8px;cursor:pointer;font-size:14px}\n.sb-board:hover{background:var(--bg)}\n.sb-board.on{background:var(--hl);color:var(--primary);font-weight:600}\n.sb-board .cnt{font-size:12px;color:var(--muted)}\n.sb-title{font-size:12px;color:var(--muted);padding:8px 12px 4px}\n#sidebar-toggle{display:none;background:none;border:1px solid var(--border);border-radius:8px;padding:5px 10px;font-size:14px;cursor:pointer;color:var(--text)}\n.layout.has-sidebar #sidebar-toggle{display:inline-block}\n#drawer-mask{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:90;display:none}\n#drawer-mask.show{display:block}\n@media(max-width:1023px){\n  .layout{display:block;max-width:720px}\n  .layout main{padding:12px 12px 80px}\n  #sidebar{position:fixed;left:0;top:0;bottom:0;width:260px;z-index:95;border-radius:0;max-height:none;transform:translateX(-100%);transition:transform .25s;display:block}\n  #sidebar.open{transform:none}\n  #sidebar-toggle{display:inline-block !important}\n}\n.upbar .upbtn{border:1.5px dashed var(--border);border-radius:10px;padding:8px 14px;font-size:13px;color:var(--muted);cursor:pointer;background:var(--card)}\n.upbar .upbtn:active{background:var(--hover,#f0f0f0)}\n.quotebox{background:var(--bg);border-left:3px solid var(--primary);padding:8px 12px;margin-bottom:8px;border-radius:0 8px 8px 0;font-size:13px;color:var(--muted);white-space:pre-wrap;max-height:120px;overflow:hidden}\n.profile-hd{text-align:center;padding:20px 0 10px}\n.profile-hd .avatar{width:64px;height:64px;border-radius:50%;background:var(--primary);color:#fff;font-size:28px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px}\n.profile-hd .nm{font-size:18px;font-weight:700}\n.profile-hd .st{font-size:13px;color:var(--muted);margin-top:6px;display:flex;gap:16px;justify-content:center}\n.avatar-img{width:28px;height:28px;border-radius:50%;object-fit:cover;vertical-align:-8px;margin-right:6px}\n.avatar-letter{width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;font-size:14px;display:inline-flex;align-items:center;justify-content:center;vertical-align:-8px;margin-right:6px;font-weight:700}\n.avatar-big{width:80px;height:80px;border-radius:50%;object-fit:cover}\n.avatar-big-letter{width:80px;height:80px;border-radius:50%;background:var(--primary);color:#fff;font-size:36px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-weight:700}\n.tabs{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}\n.tabs button{background:var(--card);border:1.5px solid var(--border);border-radius:10px;padding:9px 16px;font-size:14px;cursor:pointer;color:var(--text);white-space:nowrap;flex-shrink:0;transition:all .15s}\n.tabs button:hover{border-color:var(--primary);color:var(--primary)}\n.tabs button.on{background:var(--primary);color:#fff;border-color:var(--primary);font-weight:600}\n.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}\n.stat{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}\n.stat .n{font-size:28px;font-weight:700;color:var(--primary)}\n.stat .l{font-size:12px;color:var(--muted);margin-top:4px}\n.urow{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);font-size:14px}\n.urow:last-child{border-bottom:none}\n.urow .info{flex:1;min-width:0}\n.urow .info .nm{font-weight:600}\n.urow .info .em{font-size:12px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.urow .tag{font-size:11px;border-radius:4px;padding:1px 6px;margin-left:4px}\n.tag.ban{background:#fee2e2;color:#dc2626}\n.tag.nv{background:#fef3c7;color:#d97706}\n.tag.adm{background:#dbeafe;color:#2563eb}\n.urow .abtns{display:flex;gap:6px;flex-wrap:wrap}\n.urow .abtns button{background:none;border:1px solid var(--border);border-radius:8px;padding:4px 8px;font-size:12px;cursor:pointer}\n.urow .abtns button.danger{color:var(--danger);border-color:#fecaca}\n.setrow{margin-bottom:16px}\n.setrow label{display:block;font-size:13px;color:var(--muted);margin-bottom:6px}\n.setrow input{margin-bottom:0}\n.thread-tools{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}\n.thread-tools button{background:var(--card);border:1.5px solid var(--border);border-radius:20px;padding:6px 14px;font-size:13px;cursor:pointer;color:var(--text)}\n.thread-tools button.on{background:var(--primary);color:#fff;border-color:var(--primary)}\n#toTop{position:fixed;bottom:24px;right:20px;width:44px;height:44px;border-radius:50%;background:var(--card);border:1.5px solid var(--border);font-size:18px;cursor:pointer;display:none;z-index:50;box-shadow:0 2px 8px rgba(0,0,0,.15)}\n.post.op-post{border-left:3px solid var(--primary)}\n.post.solution-post{border:2px solid var(--primary);background:var(--hl)}\n.solution-badge{display:inline-block;font-size:11px;color:#fff;background:var(--primary);border-radius:4px;padding:1px 6px;margin-left:4px;font-weight:700}\n.floor-badge{font-size:11px;background:var(--bg);border-radius:6px;padding:1px 6px;color:var(--muted)}\n</style>\n<link rel=\"alternate\" type=\"application/rss+xml\" title=\"梦鱼资源\" href=\"/rss\">\n</head>\n<body>\n<header>\n  <div style=\"display:flex;align-items:center;gap:8px\">\n    <button id=\"sidebar-toggle\" onclick=\"toggleSidebar()\">☰</button>\n    <div class=\"logo\" onclick=\"navigate('/')\">:shipit: 梦鱼资源</div>\n    <span class=\"hnav\" onclick=\"navigate('/tools')\">🧰 工具</span>\n    <span class=\"hnav\" onclick=\"navigate('/rankings')\">🏆 排行</span>\n    <span class=\"hnav\" onclick=\"navigate('/shop')\">🛒 商城</span>\n  </div>\n  <div class=\"user\" id=\"userbar\"><span>加载中…</span></div>\n</header>\n<div id=\"searchbar\" style=\"max-width:1100px;margin:0 auto;padding:10px 12px 0;display:none\">\n  <div class=\"searchbar\">\n    <input type=\"text\" id=\"q\" placeholder=\"搜索帖子…\" onkeydown=\"if(event.key==='Enter')doSearch()\">\n    <button class=\"btn ghost\" onclick=\"doSearch()\">搜索</button>\n  </div>\n</div>\n<div class=\"layout\" id=\"layout\">\n  <aside id=\"sidebar\"></aside>\n  <main id=\"app\"><div class=\"card\"><div class=\"skel\" style=\"height:22px;width:60%;margin-bottom:12px\"></div><div class=\"skel\" style=\"height:14px;width:90%;margin-bottom:8px\"></div><div class=\"skel\" style=\"height:14px;width:75%\"></div></div><div class=\"card\"><div class=\"skel\" style=\"height:22px;width:50%;margin-bottom:12px\"></div><div class=\"skel\" style=\"height:14px;width:85%;margin-bottom:8px\"></div><div class=\"skel\" style=\"height:14px;width:65%\"></div></div></main>\n</div>\n<div id=\"drawer-mask\" onclick=\"closeDrawer()\"></div>\n<div id=\"lightbox\" onclick=\"if(event.target.id==='lightbox')closeLightbox()\">\n  <button class=\"lb-close\" onclick=\"closeLightbox()\">×</button>\n  <button class=\"lb-btn lb-prev\" onclick=\"lbNav(-1)\">‹</button>\n  <img id=\"lb-img\" src=\"\">\n  <button class=\"lb-btn lb-next\" onclick=\"lbNav(1)\">›</button>\n  <div class=\"lb-count\" id=\"lb-count\"></div>\n</div>\n<footer style=\"max-width:1100px;margin:0 auto;padding:20px 12px 40px;text-align:center;font-size:12px;color:var(--muted)\">\n  <div id=\"friend-links\" style=\"margin-bottom:10px;line-height:2\"></div>\n  <div id=\"footer-ad\">'+''+'</div>\n  <span style=\"cursor:pointer\" onclick=\"navigate('/rules')\">社区规范</span> ·\n  <span style=\"cursor:pointer\" onclick=\"navigate('/tools')\">🧰 工具中心</span> ·\n  <span id=\"foot-name\">论坛</span> ·\n  Powered by Cloudflare Workers ·\n  <a href=\"https://github.com/gdjbdg5467/qiewo\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--muted);text-decoration:none\">⭐ 开源</a>\n</footer>\n<button id=\"toTop\" onclick=\"window.scrollTo({top:0,behavior:'smooth'})\">↑</button>\n<div id=\"modal\"><div class=\"box\" id=\"modal-box\"></div></div>\n<script>\n// 中文命令解释器 - 命令数据库\n// 格式: { desc: \"命令描述\", flags: { \"-x\": \"解释\", \"--long\": \"解释\" }, example: \"示例\", tips: \"提示\" }\nconst CMD_DB = {\n\"ls\": { desc: \"列出目录内容\", example: \"ls -lh /home\", tips: \"最常用的命令之一\",\n  flags: {\"-l\": \"长格式显示（含权限、所有者、大小、时间）\", \"-a\": \"显示隐藏文件（以 . 开头）\", \"-h\": \"人类可读的文件大小（K/M/G）\", \"-t\": \"按修改时间排序\", \"-r\": \"反向排序\", \"-R\": \"递归列出子目录\", \"-S\": \"按文件大小排序\", \"-i\": \"显示 inode 号\", \"-d\": \"只显示目录本身不展开\"} },\n\"cd\": { desc: \"切换工作目录\", example: \"cd /var/log\", tips: \"cd - 返回上次目录，cd ~ 回家目录\",\n  flags: {} },\n\"pwd\": { desc: \"显示当前工作目录的绝对路径\", example: \"pwd\", flags: {} },\n\"mkdir\": { desc: \"创建目录\", example: \"mkdir -p a/b/c\",\n  flags: {\"-p\": \"递归创建多级目录（父目录不存在也创建）\", \"-m\": \"指定新目录权限，如 -m 755\", \"-v\": \"显示创建过程\"} },\n\"rm\": { desc: \"删除文件或目录 ⚠️ 危险命令\", example: \"rm -rf build/\", tips: \"删除前三思！rm 删掉的东西找不回来\",\n  flags: {\"-r\": \"递归删除目录\", \"-f\": \"强制删除，不提示确认\", \"-i\": \"删除前逐个确认\", \"-v\": \"显示删除过程\"} },\n\"cp\": { desc: \"复制文件或目录\", example: \"cp -r src/ dst/\",\n  flags: {\"-r\": \"递归复制目录\", \"-i\": \"覆盖前确认\", \"-v\": \"显示复制过程\", \"-p\": \"保留文件属性（权限、时间）\", \"-u\": \"只复制更新的文件\"} },\n\"mv\": { desc: \"移动/重命名文件\", example: \"mv old.txt new.txt\",\n  flags: {\"-i\": \"覆盖前确认\", \"-v\": \"显示移动过程\", \"-u\": \"只移动更新的文件\"} },\n\"touch\": { desc: \"创建空文件或更新时间戳\", example: \"touch file.txt\",\n  flags: {\"-c\": \"文件不存在时不创建\", \"-d\": \"指定时间，如 -d '2024-01-01'\", \"-r\": \"用参考文件的时间\"} },\n\"cat\": { desc: \"查看文件内容（适合小文件）\", example: \"cat /etc/hosts\",\n  flags: {\"-n\": \"显示行号\", \"-b\": \"显示行号（跳过空行）\", \"-s\": \"压缩连续空行\", \"-A\": \"显示所有不可见字符\"} },\n\"less\": { desc: \"分页查看文件（推荐）\", example: \"less /var/log/syslog\", tips: \"按 q 退出，/ 搜索，空格翻页\",\n  flags: {\"-N\": \"显示行号\", \"-S\": \"不换行（超长行横向滚动）\", \"+G\": \"直接跳到文件末尾\"} },\n\"head\": { desc: \"显示文件开头\", example: \"head -n 20 file.log\",\n  flags: {\"-n\": \"指定行数，如 -n 20（可简写 -20）\", \"-c\": \"指定字节数\"} },\n\"tail\": { desc: \"显示文件结尾\", example: \"tail -f /var/log/nginx/access.log\", tips: \"-f 是看日志神器\",\n  flags: {\"-n\": \"指定行数\", \"-f\": \"实时跟踪文件新增内容（看日志必备）\", \"-F\": \"同 -f，文件被轮转后自动重开\"} },\n\"grep\": { desc: \"文本搜索神器\", example: \"grep -rn 'error' /var/log/\", tips: \"配合管道使用效果翻倍\",\n  flags: {\"-r\": \"递归搜索目录\", \"-n\": \"显示行号\", \"-i\": \"忽略大小写\", \"-v\": \"反选（显示不匹配的行）\", \"-E\": \"使用扩展正则\", \"-o\": \"只显示匹配的部分\", \"-c\": \"只统计匹配行数\", \"-A\": \"显示匹配行之后 N 行\", \"-B\": \"显示匹配行之前 N 行\", \"-C\": \"显示匹配行前后 N 行\", \"--color\": \"高亮匹配部分\"} },\n\"find\": { desc: \"按条件查找文件\", example: \"find /home -name '*.log' -mtime +7\",\n  flags: {\"-name\": \"按文件名匹配（支持通配符）\", \"-iname\": \"忽略大小写的 -name\", \"-type\": \"按类型：f 文件，d 目录，l 链接\", \"-size\": \"按大小，如 +100M（大于100M）\", \"-mtime\": \"按修改时间，如 +7（7天前）\", \"-exec\": \"对找到的文件执行命令，以 \\\\; 结尾\", \"-delete\": \"直接删除找到的文件\"} },\n\"sed\": { desc: \"流编辑器（文本替换）\", example: \"sed -i 's/old/new/g' file.txt\",\n  flags: {\"-i\": \"直接修改原文件（不加则只输出不修改）\", \"-e\": \"指定多个编辑命令\", \"-n\": \"只输出处理的行（常与 p 连用）\", \"s/\": \"替换命令 s/旧/新/g（g 表示全局）\", \"d\": \"删除行\", \"p\": \"打印行\"} },\n\"awk\": { desc: \"文本处理三剑客之一（按列处理）\", example: \"awk '{print $1}' access.log\", tips: \"$1 第一列，$0 整行，NF 列数\",\n  flags: {\"-F\": \"指定分隔符，如 -F','\", \"NR\": \"当前行号\", \"NF\": \"当前行列数\"} },\n\"sort\": { desc: \"排序\", example: \"sort -k2 -n data.txt\",\n  flags: {\"-n\": \"按数字排序\", \"-r\": \"反向\", \"-k\": \"按第 K 列排序\", \"-u\": \"去重\", \"-t\": \"指定分隔符\"} },\n\"uniq\": { desc: \"去重（需先排序）\", example: \"sort file | uniq -c\",\n  flags: {\"-c\": \"统计重复次数\", \"-d\": \"只显示重复的行\", \"-u\": \"只显示不重复的行\"} },\n\"wc\": { desc: \"统计行数/单词/字节\", example: \"wc -l *.txt\",\n  flags: {\"-l\": \"行数\", \"-w\": \"单词数\", \"-c\": \"字节数\", \"-m\": \"字符数\"} },\n\"chmod\": { desc: \"修改文件权限\", example: \"chmod 755 script.sh\", tips: \"7=rwx，6=rw-，5=r-x，4=r--\",\n  flags: {\"-R\": \"递归修改\", \"+x\": \"添加执行权限\", \"-x\": \"去掉执行权限\"} },\n\"chown\": { desc: \"修改文件所有者\", example: \"chown -R www:www /var/www\",\n  flags: {\"-R\": \"递归\", \":组\": \"同时改组，如 user:group\"} },\n\"ps\": { desc: \"查看进程\", example: \"ps aux | grep nginx\",\n  flags: {\"a\": \"所有用户的进程\", \"u\": \"显示用户/启动时间\", \"x\": \"无终端的进程\", \"-ef\": \"完整格式显示\", \"--sort\": \"排序，如 --sort=-%cpu\"} },\n\"top\": { desc: \"实时进程监控\", example: \"top\", tips: \"按 q 退出，M 按内存排序，P 按 CPU 排序\",\n  flags: {\"-u\": \"只看某用户，如 -u www\", \"-p\": \"只看指定 PID\"} },\n\"kill\": { desc: \"终止进程\", example: \"kill -9 1234\", tips: \"先试试不加 -9，给进程优雅退出的机会\",\n  flags: {\"-9\": \"强制杀死（SIGKILL，不可捕获）\", \"-15\": \"优雅终止（默认，SIGTERM）\", \"-l\": \"列出所有信号\"} },\n\"killall\": { desc: \"按名字杀进程\", example: \"killall -9 chrome\",\n  flags: {\"-9\": \"强制\", \"-u\": \"只杀某用户的\"} },\n\"df\": { desc: \"查看磁盘空间\", example: \"df -h\",\n  flags: {\"-h\": \"人类可读\", \"-T\": \"显示文件系统类型\", \"-i\": \"看 inode 使用率\"} },\n\"du\": { desc: \"查看目录占用\", example: \"du -sh /var/* | sort -rh | head\",\n  flags: {\"-s\": \"只显示总和\", \"-h\": \"人类可读\", \"--max-depth\": \"指定深度，如 --max-depth=1\"} },\n\"free\": { desc: \"查看内存\", example: \"free -h\",\n  flags: {\"-h\": \"人类可读\", \"-s\": \"每 N 秒刷新\"} },\n\"tar\": { desc: \"打包/解包\", example: \"tar -xzf pkg.tar.gz -C /opt\", tips: \"记住：c 压缩 x 解包 v 显示过程 f 文件\",\n  flags: {\"-c\": \"创建包\", \"-x\": \"解包\", \"-z\": \"gzip 压缩/解压\", \"-j\": \"bzip2\", \"-J\": \"xz\", \"-v\": \"显示过程\", \"-f\": \"指定文件名（必须是最后一个短参数）\", \"-C\": \"切换到指定目录\", \"--strip-components\": \"解压时去掉 N 层目录\", \"-t\": \"列出包内容不解压\"} },\n\"curl\": { desc: \"网络请求神器\", example: \"curl -fsSL https://example.com/install.sh | bash\",\n  flags: {\"-o\": \"保存为文件\", \"-O\": \"用远程文件名保存\", \"-L\": \"跟随重定向\", \"-s\": \"静默（不显示进度）\", \"-S\": \"出错时显示错误（常与 -s 连用）\", \"-f\": \"HTTP 错误时返回非零\", \"-I\": \"只取响应头\", \"-X\": \"指定方法，如 -X POST\", \"-H\": \"加请求头\", \"-d\": \"POST 数据\"} },\n\"wget\": { desc: \"下载文件\", example: \"wget -c https://example.com/big.iso\",\n  flags: {\"-c\": \"断点续传\", \"-O\": \"指定保存名\", \"-q\": \"静默\", \"--limit-rate\": \"限速，如 200k\"} },\n\"ssh\": { desc: \"远程登录\", example: \"ssh -p 2222 user@host\",\n  flags: {\"-p\": \"指定端口\", \"-i\": \"指定私钥文件\", \"-L\": \"本地端口转发\", \"-R\": \"远程端口转发\", \"-N\": \"不执行命令（配合转发用）\", \"-f\": \"后台运行\"} },\n\"scp\": { desc: \"远程复制文件\", example: \"scp -r local/ user@host:/remote/\",\n  flags: {\"-r\": \"递归复制目录\", \"-P\": \"指定端口（大写 P）\", \"-C\": \"压缩传输\", \"-i\": \"指定私钥\"} },\n\"systemctl\": { desc: \"管理系统服务\", example: \"systemctl restart nginx\",\n  flags: {}, extra: \"常用：start 启动 / stop 停止 / restart 重启 / status 状态 / enable 开机自启 / disable 取消自启 / daemon-reload 重载配置\" },\n\"journalctl\": { desc: \"查看系统日志\", example: \"journalctl -u nginx -f\",\n  flags: {\"-u\": \"只看某服务\", \"-f\": \"实时跟踪\", \"-n\": \"显示最后 N 行\", \"--since\": \"指定时间，如 --since '1 hour ago'\"} },\n\"apt\": { desc: \"Debian/Ubuntu 包管理\", example: \"sudo apt install -y vim\",\n  flags: {}, extra: \"常用：update 更新索引 / upgrade 升级 / install 安装 / remove 卸载 / search 搜索 / show 查看详情 / autoremove 清理\" },\n\"yum\": { desc: \"CentOS/RHEL 包管理（旧）\", example: \"sudo yum install -y vim\", flags: {} },\n\"dnf\": { desc: \"Fedora/RHEL 包管理（新）\", example: \"sudo dnf install -y vim\", flags: {} },\n\"docker\": { desc: \"容器管理\", example: \"docker run -d -p 8080:80 --name web nginx\",\n  flags: {}, extra: \"常用：ps 查看 / images 镜像 / pull 拉取 / run 运行 / exec 进入容器 / logs 看日志 / stop 停止 / rm 删除\" },\n\"git\": { desc: \"版本控制\", example: \"git clone https://github.com/xxx/yyy.git\",\n  flags: {}, extra: \"常用：status 状态 / add 添加 / commit 提交 / push 推送 / pull 拉取 / branch 分支 / log 历史 / checkout 切换\" },\n\"vim\": { desc: \"终端编辑器\", example: \"vim file.txt\", tips: \"i 进入编辑，Esc 退出编辑，:wq 保存退出，:q! 不保存退出\",\n  flags: {} },\n\"crontab\": { desc: \"定时任务\", example: \"crontab -e\", tips: \"格式：分 时 日 月 周 命令\",\n  flags: {\"-e\": \"编辑\", \"-l\": \"列出\", \"-r\": \"删除\"} },\n\"ping\": { desc: \"测试网络连通\", example: \"ping -c 4 8.8.8.8\",\n  flags: {\"-c\": \"指定次数\", \"-i\": \"间隔秒数\"} },\n\"ip\": { desc: \"网络配置（替代 ifconfig）\", example: \"ip addr show\",\n  flags: {}, extra: \"常用：addr 查看地址 / route 查看路由 / link 查看网卡\" },\n\"ss\": { desc: \"查看端口连接（替代 netstat）\", example: \"ss -tlnp\",\n  flags: {\"-t\": \"TCP\", \"-u\": \"UDP\", \"-l\": \"监听中\", \"-n\": \"显示数字不解析\", \"-p\": \"显示进程\"} },\n\"uname\": { desc: \"系统信息\", example: \"uname -a\",\n  flags: {\"-a\": \"全部\", \"-r\": \"内核版本\", \"-m\": \"架构\"} },\n\"history\": { desc: \"命令历史\", example: \"history | grep ssh\", tips: \"!数字 重新执行那条命令，!! 执行上一条\",\n  flags: {\"-c\": \"清空历史\"} },\n\"echo\": { desc: \"输出文本\", example: \"echo 'hello' > file.txt\",\n  flags: {\"-e\": \"解析转义字符（\\\\n 换行）\", \"-n\": \"不输出末尾换行\"} },\n\"export\": { desc: \"设置环境变量\", example: \"export PATH=$PATH:/opt/bin\", flags: {} },\n\"alias\": { desc: \"命令别名\", example: \"alias ll='ls -lh'\", flags: {} },\n\"sudo\": { desc: \"以 root 执行\", example: \"sudo apt update\", flags: {} },\n\"su\": { desc: \"切换用户\", example: \"su -\", tips: \"su - 切换到 root 并加载环境\",\n  flags: {\"-\": \"完整切换（含环境变量）\"} },\n\"mount\": { desc: \"挂载\", example: \"mount /dev/sdb1 /mnt/data\", flags: {} },\n\"umount\": { desc: \"卸载\", example: \"umount /mnt/data\", flags: {} },\n\"ln\": { desc: \"创建链接\", example: \"ln -s /opt/app /usr/local/app\",\n  flags: {\"-s\": \"软链接（常用）\", \"-f\": \"强制覆盖\"} },\n\"cut\": { desc: \"按列切分\", example: \"cut -d: -f1 /etc/passwd\",\n  flags: {\"-d\": \"分隔符\", \"-f\": \"取第几列\"} },\n\"tr\": { desc: \"字符替换/删除\", example: \"echo hello | tr 'a-z' 'A-Z'\",\n  flags: {\"-d\": \"删除字符\"} },\n\"xargs\": { desc: \"把输入转成参数\", example: \"find . -name '*.log' | xargs rm\",\n  flags: {\"-I\": \"指定替换符，如 -I{}\", \"-n\": \"每次传 N 个参数\"} },\n\"tee\": { desc: \"输出到屏幕同时写文件\", example: \"echo hi | tee out.txt\",\n  flags: {\"-a\": \"追加不覆盖\"} },\n\"watch\": { desc: \"定时执行命令\", example: \"watch -n 1 'df -h'\",\n  flags: {\"-n\": \"间隔秒数\", \"-d\": \"高亮变化部分\"} },\n\"tmux\": { desc: \"终端复用器\", example: \"tmux new -s work\", tips: \"Ctrl-b d  detach，tmux a -t work 重新接入\",\n  flags: {} },\n\"rsync\": { desc: \"高效同步文件\", example: \"rsync -avz src/ dst/\",\n  flags: {\"-a\": \"归档模式（保留属性）\", \"-v\": \"显示过程\", \"-z\": \"压缩\", \"--delete\": \"删除目标多余文件\", \"-n\": \"试运行不真干\"} },\n\"nc\": { desc: \"网络瑞士军刀\", example: \"nc -lvnp 4444\", tips: \"可做简易端口监听、传文件\",\n  flags: {\"-l\": \"监听\", \"-v\": \"详细\", \"-n\": \"不解析\", \"-p\": \"端口\"} },\n\"lsof\": { desc: \"查看打开的文件/端口占用\", example: \"lsof -i :8080\",\n  flags: {\"-i\": \"网络相关，如 -i :80\", \"-p\": \"指定 PID\"} },\n\"strace\": { desc: \"跟踪系统调用（排障神器）\", example: \"strace -p 1234\",\n  flags: {\"-p\": \"跟踪已运行进程\", \"-e\": \"只跟踪某类，如 -e open\"} },\n\"htop\": { desc: \"top 的增强版\", example: \"htop\", flags: {} },\n\"tree\": { desc: \"树形列目录\", example: \"tree -L 2\",\n  flags: {\"-L\": \"指定深度\", \"-d\": \"只显示目录\"} },\n\"which\": { desc: \"找命令位置\", example: \"which python3\", flags: {} },\n\"file\": { desc: \"看文件类型\", example: \"file image.png\", flags: {} },\n\"stat\": { desc: \"文件详细信息\", example: \"stat file.txt\", flags: {} },\n\"md5sum\": { desc: \"算 MD5\", example: \"md5sum file.iso\", flags: {} },\n\"sha256sum\": { desc: \"算 SHA256\", example: \"sha256sum file.iso\", flags: {} },\n\"base64\": { desc: \"base64 编解码\", example: \"echo hello | base64\",\n  flags: {\"-d\": \"解码\"} },\n\"jq\": { desc: \"JSON 处理神器\", example: \"cat data.json | jq '.name'\",\n  flags: {\"-r\": \"输出原始字符串（去引号）\"} },\n\"yq\": { desc: \"YAML 处理\", example: \"yq '.a.b' config.yml\", flags: {} },\n\"awk\": { desc: \"文本处理（按列）\", example: \"awk -F: '{print $1}' /etc/passwd\", flags: {\"-F\": \"分隔符\"} },\n};\n\n// Linux 段位测试 - 题库（20题，由易到难）\n// 每题: q 问题, opts 选项, a 正确答案索引, why 解析\nconst QUIZ_DB = [\n{q:\"想看看当前目录下有哪些文件，应该用什么命令？\",opts:[\"ls\",\"cd\",\"rm\",\"pwd\"],a:0,why:\"ls = list，列出目录内容，是 Linux 入门第一课。\"},\n{q:\"不小心删错文件，rm 删掉的东西能去回收站找回吗？\",opts:[\"能，在 /tmp 里\",\"能，用 undo 恢复\",\"不能，直接没了\",\"看运气\"],a:2,why:\"rm 是直接删除，没有回收站！删之前一定要三思。\"},\n{q:\"想创建一个叫 test 的目录，命令是？\",opts:[\"touch test\",\"mkdir test\",\"create test\",\"newdir test\"],a:1,why:\"mkdir = make directory。touch 是创建空文件，别搞混。\"},\n{q:\"文件权限 rwxr-xr-x 用数字表示是？\",opts:[\"644\",\"755\",\"777\",\"600\"],a:1,why:\"r=4 w=2 x=1：rwx=7，r-x=5，所以是 755。\"},\n{q:\"想把 file.txt 复制一份叫 file.bak，命令是？\",opts:[\"mv file.txt file.bak\",\"cp file.txt file.bak\",\"copy file.txt file.bak\",\"ln file.txt file.bak\"],a:1,why:\"cp = copy。mv 是移动/重命名，原文件会消失。\"},\n{q:\"用 grep 在日志里找包含 error 的行，还想看行号，用哪个参数？\",opts:[\"grep -i\",\"grep -n\",\"grep -v\",\"grep -c\"],a:1,why:\"-n = line number 显示行号。-i 忽略大小写，-v 反选，-c 只计数。\"},\n{q:\"管道符 | 的作用是什么？\",opts:[\"表示'或'的关系\",\"把上一个命令的输出传给下一个命令\",\"分隔多个命令\",\"注释符号\"],a:1,why:\"管道是 Linux 哲学的精髓：小工具组合成大威力，如 ps aux | grep nginx。\"},\n{q:\"想看一个正在写入的日志文件的实时新增内容，用？\",opts:[\"cat -f\",\"head -f\",\"tail -f\",\"less -f\"],a:2,why:\"tail -f = follow，实时跟踪文件尾部，看日志必备神器。\"},\n{q:\"find / -name '*.log' 2>/dev/null 里，2>/dev/null 是干嘛的？\",opts:[\"把结果保存到 /dev/null\",\"把错误信息丢掉不显示\",\"删除找到的日志\",\"限速查找\"],a:1,why:\"2 是标准错误的文件描述符，>/dev/null 就是把报错丢进黑洞，屏幕只留正常结果。\"},\n{q:\"chmod -R 755 /var/www 里 -R 的意思是？\",opts:[\"只读模式\",\"递归处理子目录和文件\",\"反向操作\",\"随机权限\"],a:1,why:\"-R = recursive，递归。对目录操作时几乎都要加 -R。\"},\n{q:\"服务器 CPU 100%，想快速定位是哪个进程在作妖，第一步？\",opts:[\"重启服务器\",\"top 按 P 排序看 CPU 占用\",\"rm -rf /tmp\",\"ping 一下\"],a:1,why:\"top 里按 P 按 CPU 排序，一眼看出元凶。重启是最后手段。\"},\n{q:\"ssh 连不上服务器，ping 是通的，最可能先查什么？\",opts:[\"ss -tlnp 看 22 端口有没有在监听\",\"换个键盘\",\"重装系统\",\"等它自己好\"],a:0,why:\"ping 通说明网络 OK，ssh 不通先看 sshd 有没有在监听 22 端口。\"},\n{q:\"df -h 显示磁盘 100% 满了，但 du -sh /* 加起来远不到，怎么回事？\",opts:[\"硬盘坏了\",\"有进程还拿着已删除文件不放\",\"df 算错了\",\"需要重启\"],a:1,why:\"经典坑：文件被删但进程没关，空间不释放。用 lsof | grep deleted 找到元凶，重启进程即可。\"},\n{q:\"想让一个脚本开机自启，最现代的做法是？\",opts:[\"写进 /etc/rc.local\",\"加到 crontab @reboot\",\"写一个 systemd service 并 enable\",\"放桌面上\"],a:2,why:\"systemd 是现代 Linux 的标准：写 service 文件 + systemctl enable，一劳永逸。\"},\n{q:\"tar -xzf pkg.tar.gz -C /opt 解压后文件不在 /opt 里，最可能的原因？\",opts:[\"tar 坏了\",\"包里带了多层目录，要用 --strip-components\",\"/opt 不存在\",\"需要加 -v\"],a:1,why:\"很多包解压出来自带一层目录，--strip-components=1 可以剥掉。先用 tar -tzf 看包结构。\"},\n{q:\"生产环境误删了 /etc/nginx/nginx.conf，但 nginx 还在运行，怎么救？\",opts:[\"从 /proc/PID/exe 找\",\"nginx -T 可以打出当前生效的完整配置\",\"没救了\",\"去 /tmp 找备份\"],a:1,why:\"nginx -T 会 dump 出当前内存中的完整配置，重定向保存就能救回来。这是救命知识。\"},\n{q:\"OOM killer 杀掉了你的进程，dmesg 里能看到什么关键词？\",opts:[\"Segmentation fault\",\"Out of memory: Kill process\",\"Connection refused\",\"Permission denied\"],a:1,why:\"内存耗尽时内核的 OOM killer 会挑进程杀掉，dmesg 是第一现场。\"},\n{q:\"一个服务偶发卡顿，strace -p PID 发现卡在 futex 上，说明什么？\",opts:[\"CPU 坏了\",\"进程在等锁/条件变量，大概率是锁竞争\",\"网络断了\",\"磁盘满了\"],a:1,why:\"futex 是用户态锁的系统调用，卡在这里说明多线程在抢锁，要看代码的锁粒度。\"},\n{q:\"线上 MySQL 突然变慢，show processlist 全是 Sending data，第一反应查什么？\",opts:[\"是不是没走索引（explain 看执行计划）\",\"重启 MySQL\",\"加内存\",\"换 SSD\"],a:0,why:\"Sending data 堆积 + 没索引 = 全表扫描。先 explain，别急着加硬件。\"},\n{q:\"你写了个脚本在 cron 里跑，手动执行正常，cron 里却失败，最常见的原因是？\",opts:[\"cron 坏了\",\"环境变量（PATH）不一样，cron 里很干净\",\"脚本有 bug\",\"时间不对\"],a:1,why:\"cron 的环境变量极简，PATH 里可能没有你的命令。用绝对路径或在脚本开头 source 环境，这是运维经典坑。\"},\n// ---- 新增题库（随机抽题用）----\n{q:\"pwd 命令是干嘛的？\",opts:[\"显示当前目录的绝对路径\",\"修改密码\",\"查看进程\",\"打印环境变量\"],a:0,why:\"pwd = print working directory，迷路时先 pwd 看看自己在哪。\"},\n{q:\"想回到上一级目录，命令是？\",opts:[\"cd .\",\"cd ..\",\"cd /\",\"cd ~\"],a:1,why:\".. 代表上一级，. 代表当前目录，~ 代表家目录。\"},\n{q:\"ls -la 和 ls -l 的区别是？\",opts:[\"没区别\",\"-a 会显示隐藏文件\",\"-a 速度更快\",\"-a 只显示目录\"],a:1,why:\"-a = all，连 . 开头的隐藏文件也显示。配置文件经常是隐藏的。\"},\n{q:\"cat file.txt | head -5 可以简写成？\",opts:[\"head -5 file.txt\",\"cat -5 file.txt\",\"head file.txt 5\",\"不能简写\"],a:0,why:\"head/tail/grep 等命令都支持直接跟文件名，不用 cat 管道，多此一举叫 UUOC（无用的 cat）。\"},\n{q:\"echo $HOME 会输出什么？\",opts:[\"字符串 $HOME\",\"当前用户的家目录路径\",\"报错\",\"空\"],a:1,why:\"$HOME 是环境变量，echo 会展开它。单引号不展开，双引号展开。\"},\n{q:\"想给命令起个别名，比如把 ll 变成 ls -lh，怎么做？\",opts:[\"alias ll='ls -lh'\",\"nickname ll='ls -lh'\",\"set ll='ls -lh'\",\"link ll='ls -lh'\"],a:0,why:\"alias 设别名，写进 ~/.bashrc 永久生效。unlias 取消。\"},\n{q:\"which python3 和 whereis python3 的区别？\",opts:[\"没区别\",\"which 只找 PATH 里的可执行文件，whereis 还找源码和 man\",\"whereis 更快\",\"which 只能找系统命令\"],a:1,why:\"which 看的是实际会执行的那个，排查'命令找不到'先 which。\"},\n{q:\"chmod 777 是什么意思？为什么不推荐？\",opts:[\"所有人可读写执行，太开放不安全\",\"最高权限，推荐\",\"只读模式\",\"删除文件\"],a:0,why:\"777 = 所有用户 rwx，任何漏洞都能改你的文件。能 755 就别 777。\"},\n{q:\"chown root:root file 和 chmod 755 file 的区别？\",opts:[\"没区别\",\"chown 改所有者，chmod 改权限\",\"chown 更安全\",\"chmod 改所有者\"],a:1,why:\"chown 改'谁的'，chmod 改'能干嘛'，两回事。\"},\n{q:\"ln -s /opt/app /usr/local/app 创建的是？\",opts:[\"硬链接\",\"软链接（符号链接）\",\"复制\",\"挂载\"],a:1,why:\"-s = symbolic 软链接，像快捷方式。删源文件链接就断了。\"},\n{q:\"du -sh * | sort -rh | head -5 是在干嘛？\",opts:[\"找最大的 5 个文件/目录\",\"排序所有文件\",\"删除大文件\",\"压缩文件\"],a:0,why:\"磁盘满了找元凶三连：du 看大小，sort 排序，head 取前 N。\"},\n{q:\"free -h 里 buff/cache 很高，需要担心吗？\",opts:[\"需要，内存要爆了\",\"不用，Linux 会拿空闲内存做缓存，不够用会自动释放\",\"需要，立即重启\",\"看情况\"],a:1,why:\"Linux 哲学：空闲内存就是浪费的内存。看 available 那一列才是真正可用的。\"},\n{q:\"ps aux 里 STAT 显示为 Z 的进程是什么？\",opts:[\"正在运行\",\"僵尸进程（已死但父进程没回收）\",\"睡眠\",\"停止\"],a:1,why:\"Z = zombie，父进程没 wait()。多了说明父进程有 bug。\"},\n{q:\"kill -9 和 kill（默认）有什么区别？\",opts:[\"没区别\",\"-9 是 SIGKILL 强制杀，不给清理机会；默认 SIGTERM 让进程优雅退出\",\"-9 更温和\",\"默认更暴力\"],a:1,why:\"先 kill，不行再 kill -9。-9 连临时文件都没机会删。\"},\n{q:\"nohup ./app & 里的 & 和 nohup 分别是干嘛的？\",opts:[\"& 后台运行，nohup 防止终端关闭时进程被杀\",\"都是后台的意思\",\"& 是注释\",\"nohup 是加速\"],a:0,why:\"& 放后台，nohup 忽略 HUP 信号。临时跑服务用这招，长期用 systemd。\"},\n{q:\"curl -I https://example.com 是在干嘛？\",opts:[\"下载首页\",\"只取 HTTP 响应头\",\"测试网速\",\"发 POST 请求\"],a:1,why:\"-I = head，只看响应头不拿 body，查状态码、重定向最快。\"},\n{q:\"wget -c 的 -c 有什么用？\",opts:[\"压缩下载\",\"断点续传\",\"静默模式\",\"限速\"],a:1,why:\"-c = continue，大文件下载中断了能接着下，不用从头来。\"},\n{q:\"scp -P 2222 file user@host:/tmp/ 里 -P 是？\",opts:[\"大写的 P 指定 SSH 端口\",\"小写也行\",\"压缩\",\"递归\"],a:0,why:\"scp 的端口参数是大写 -P（ssh 是小写 -p），记混就连不上。\"},\n{q:\"ss -tlnp 里每个字母的意思？\",opts:[\"t=TCP l=监听 n=数字显示 p=进程\",\"随便写的\",\"t=时间\",\"p=端口\"],a:0,why:\"查端口占用三连：ss -tlnp，看谁占了 80/443。netstat 已是老古董。\"},\n{q:\"ping 不通但能 ssh 上，可能是什么原因？\",opts:[\"网线没插\",\"对方禁了 ICMP（防火墙 drop 了 ping）\",\"DNS 坏了\",\"ssh 走的另一根网线\"],a:1,why:\"ping 用 ICMP，很多服务器防火墙直接禁掉。ssh 通说明网络没问题。\"},\n{q:\"/etc/hosts 文件是干嘛的？\",opts:[\"存密码的\",\"本地域名解析，优先级高于 DNS\",\"存主机名的\",\"日志文件\"],a:1,why:\"hosts 里写死 127.0.0.1 myapp.local，开发调试神器。\"},\n{q:\"apt update 和 apt upgrade 的区别？\",opts:[\"没区别\",\"update 更新软件索引，upgrade 真正升级软件\",\"update 更危险\",\"upgrade 只更新索引\"],a:1,why:\"update = 更新货架目录，upgrade = 把货买回家。两个都要跑。\"},\n{q:\"systemctl status nginx 显示 active (running) 说明？\",opts:[\"nginx 正在运行\",\"nginx 已停止\",\"nginx 启动失败\",\"看不出来\"],a:0,why:\"active (running) = 活着。failed 就是挂了，journalctl -u nginx 看日志。\"},\n{q:\"journalctl -u nginx --since '1 hour ago' 是在查？\",opts:[\"nginx 一小时内的日志\",\"nginx 的配置\",\"nginx 的进程\",\"nginx 的端口\"],a:0,why:\"journalctl 按服务查日志，--since 限定时间，比翻文件快。\"},\n{q:\"crontab 里 */5 * * * * 是什么意思？\",opts:[\"每 5 秒\",\"每 5 分钟\",\"每天 5 点\",\"每月 5 号\"],a:1,why:\"五个字段：分时日月周。*/5 每 5 分钟。想每秒？cron 最小粒度是分钟。\"},\n{q:\"tmux 最大的用处是什么？\",opts:[\"分屏\",\"SSH 断开后会话不死，重连还能找回\",\"美化终端\",\"加速\"],a:1,why:\"跑长任务必备：tmux 里开跑，断网重连 tmux attach 会话还在。\"},\n{q:\"rsync -avz 和 cp -r 相比，优势在哪？\",opts:[\"更快\",\"增量同步，只传变化的部分，断点续传\",\"更安全\",\"没区别\"],a:1,why:\"rsync 传大文件/同步目录是王道，-avz 增量+压缩，中断了接着传。\"},\n{q:\"docker ps 和 docker images 的区别？\",opts:[\"没区别\",\"ps 看运行中的容器，images 看本地镜像\",\"ps 更详细\",\"images 看容器\"],a:1,why:\"镜像是菜谱，容器是做出来的菜。ps 看菜，images 看菜谱。\"},\n{q:\"git pull 和 git fetch 的区别？\",opts:[\"没区别\",\"fetch 只下载不合并，pull = fetch + merge\",\"pull 更安全\",\"fetch 会覆盖本地\"],a:1,why:\"怕冲突？先 fetch 看看，再决定合不合。pull 直接合，翻车更快。\"},\n{q:\"vim 里怎么不保存直接退出？\",opts:[\"：wq\",\"：q!\",\"：x\",\"Ctrl+C\"],a:1,why:\":q! 强制退出不保存。:wq 保存退出，:x 同 :wq。\"},\n{q:\"history | grep ssh 能干嘛？\",opts:[\"看历史命令里跟 ssh 相关的\",\"删除 ssh 记录\",\"执行 ssh\",\"清空历史\"],a:0,why:\"忘了上次怎么连的？history 翻出来，!数字 还能直接重跑。\"},\n];\n// 段位：分数区间 -> 称号\nconst RANK_TABLE = [\n  {min:0,  max:30,  title:\"菜鸟企鹅\",   desc:\"刚破壳的小企鹅，别急，每个大神都是从 ls 开始的。\", emoji:\"🐣\"},\n  {min:35, max:50,  title:\"企鹅学徒\",   desc:\"已经会走路了，继续在终端里摸爬滚打吧。\", emoji:\"🐧\"},\n  {min:55, max:65,  title:\"终端熟手\",   desc:\"常用命令信手拈来，可以开始折腾自己的 VPS 了。\", emoji:\"💻\"},\n  {min:70, max:80,  title:\"Shell 玩家\",  desc:\"管道和脚本玩得溜，自动化已经刻进 DNA。\", emoji:\"⚡\"},\n  {min:85, max:90,  title:\"内核探索者\", desc:\"开始触及系统底层，排障思路清晰的老手。\", emoji:\"🔬\"},\n  {min:95, max:95,  title:\"企鹅大师\",   desc:\"深不见底，翻车现场的定海神针。\", emoji:\"👑\"},\n  {min:100, max:100, title:\"开源领袖\",  desc:\"满分！你就是传说本身，企鹅窝以你为荣。\", emoji:\"🌟\"},\n];\nfunction quizRank(score){\n  for(const r of RANK_TABLE) if(score >= r.min && score <= r.max) return r;\n  return RANK_TABLE[0];\n}\n\nconst app = document.getElementById('app');\nlet me = null;\nlet siteSettings = { site_name: '论坛', site_logo: '💬', site_desc: '', announcement: '' };\nlet globalAds = {}, globalLinks = [];\nasync function loadAds(){\n  try{\n    const j = await api('/api/ads');\n    globalAds = j.ads || {};\n  }catch(e){ globalAds = {}; }\n  try{\n    const l = await api('/api/friend-links');\n    globalLinks = l.links || [];\n  }catch(e){ globalLinks = []; }\n  renderFooterLinks();\n}\nfunction adHtml(position){\n  const list = globalAds[position];\n  if(!list || !list.length) return '';\n  return list.map(a=>\n    '<div class=\"ad-box\" style=\"margin:12px 0;padding:10px;border:1px dashed var(--border);border-radius:8px;text-align:center;position:relative\">'+\n    '<span style=\"position:absolute;top:2px;right:6px;font-size:10px;color:var(--muted)\">广告</span>'+\n    (a.img_url ? '<a href=\"'+esc(a.url)+'\" target=\"_blank\" onclick=\"adClick('+a.id+')\"><img src=\"'+esc(a.img_url)+'\" style=\"max-width:100%;border-radius:6px\" loading=\"lazy\"></a>'\n     : '<a href=\"'+esc(a.url)+'\" target=\"_blank\" onclick=\"adClick('+a.id+')\" style=\"color:var(--primary);font-size:14px\">📢 '+esc(a.title)+'</a>')+\n    '</div>'\n  ).join('');\n}\nfunction adClick(id){\n  api('/api/ads/'+id+'/click', {method:'POST'}).catch(()=>{});\n}\nfunction renderFooterLinks(){\n  const box = document.getElementById('friend-links');\n  if(!box) return;\n  if(!globalLinks.length){ box.style.display = 'none'; return; }\n  box.style.display = '';\n  box.innerHTML = '<span style=\"color:var(--muted)\">友情链接：</span>' +\n    globalLinks.map(l=>'<a href=\"'+esc(l.url)+'\" target=\"_blank\" title=\"'+esc(l.descr||l.name)+'\" style=\"color:var(--muted);margin:0 8px\">'+esc(l.name)+'</a>').join('');\n  const adBox = document.getElementById('footer-ad');\n  if(adBox) adBox.innerHTML = adHtml('footer_banner');\n}\n\nasync function loadSiteSettings(){\n  try{\n    const j = await api('/api/settings');\n    siteSettings = { ...siteSettings, ...j.settings };\n  }catch(e){}\n  document.querySelector('header .logo').innerHTML = esc(siteSettings.site_logo) + ' ' + esc(siteSettings.site_name);\n  document.title = siteSettings.site_name;\n  document.getElementById('foot-name').textContent = siteSettings.site_name;\n}\nfunction announcementBanner(){\n  if(siteSettings.announcement){\n    return '<div class=\"card\" style=\"background:var(--hl)\">📢 ' + esc(siteSettings.announcement) + '</div>';\n  }\n  return '';\n}\nfunction setTitle(t){\n  document.title = t ? t + ' - ' + siteSettings.site_name : siteSettings.site_name;\n}\n\nfunction esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;')}\nfunction timeAgo(ts){\n  const d = Date.now()-ts;\n  if(d<60e3) return '刚刚';\n  if(d<3600e3) return Math.floor(d/60e3)+' 分钟前';\n  if(d<86400e3) return Math.floor(d/3600e3)+' 小时前';\n  if(d<30*86400e3) return Math.floor(d/86400e3)+' 天前';\n  return new Date(ts).toLocaleDateString();\n}\nasync function api(path, opts){\n  const r = await fetch(path, {headers:{'Content-Type':'application/json'}, ...opts});\n  const j = await r.json().catch(()=>({error:'网络错误'}));\n  if(j.error) throw new Error(j.error);\n  return j;\n}\nasync function refreshMe(){\n  try{ const j = await api('/api/me'); me = j.user; }catch(e){ me = null; }\n  renderUserbar();\n}\nfunction renderUserbar(){\n  const ub = document.getElementById('userbar');\n  const themeBtn = '<button onclick=\"toggleTheme()\" title=\"切换深色/浅色\">'+(document.documentElement.dataset.theme==='dark'?'☀️':'🌙')+'</button>';\n  if(me){\n    ub.innerHTML = themeBtn+'<button onclick=\"showCheckin()\" title=\"每日签到\" id=\"checkin-btn\">📅 签到</button>'+\n      '<span style=\"cursor:pointer;font-size:13px;white-space:nowrap\" onclick=\"navigate(\\'/shop\\')\" title=\"我的积分\">⭐ '+(me.points||0)+'</span>'+\n      '<span class=\"bell\" onclick=\"navigate(\\'/notifications\\')\" title=\"通知\">🔔<span class=\"dot\" id=\"notif-dot\" style=\"display:none\"></span></span>'+\n      '<span class=\"bell\" onclick=\"navigate(\\'/dm\\')\" title=\"私信\">✉️<span class=\"dot\" id=\"dm-dot\" style=\"display:none\"></span></span>'+\n      '<span style=\"position:relative;cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap\" id=\"uavatar\">'+avatarHtml(me.avatar_url, me.name, '', me.avatar_frame)+\n      '<div class=\"umenu\" id=\"umenu\">'+\n        '<div onclick=\"navigate(\\'/u/'+me.id+'\\')\">👤 我的主页</div>'+\n        '<div onclick=\"navigate(\\'/settings\\')\">⚙️ 个人设置</div>'+\n        (me.is_admin ? '<div onclick=\"navigate(\\'/admin\\')\">🛠️ 管理后台</div>' : '')+\n        '<div class=\"danger\" onclick=\"logout()\">🚪 退出登录</div>'+\n      '</div></span>';\n    document.getElementById('uavatar').onclick = (e)=>{ e.stopPropagation(); document.getElementById('umenu').classList.toggle('open'); };\n    loadNotifCount();\n    loadDmCount();\n    updateCheckinBtn();\n  }else{\n    ub.innerHTML = themeBtn+'<button onclick=\"showLogin()\">登录</button><button onclick=\"showRegister()\">注册</button>';\n  }\n}\ndocument.addEventListener('click', ()=>{ const m=document.getElementById('umenu'); if(m) m.classList.remove('open'); });\nasync function updateCheckinBtn(){\n  try{\n    const j = await api('/api/checkin/status');\n    const btn = document.getElementById('checkin-btn');\n    if(btn) btn.innerHTML = j.checked ? '✅ 已签到' : '📅 签到';\n    if(btn && j.checked) btn.disabled = true;\n  }catch(e){}\n}\nfunction showCheckin(){\n  showModal('<h3>📅 每日签到</h3><div id=\"checkin-body\"><div class=\"hint\">加载中…</div></div>');\n  loadCheckinStatus();\n}\nasync function loadCheckinStatus(){\n  try{\n    const j = await api('/api/checkin/status');\n    let html = '<div style=\"text-align:center;padding:20px\">';\n    html += '<div style=\"font-size:48px;margin-bottom:12px\">📅</div>';\n    if(j.checked){\n      html += '<div style=\"font-size:16px;font-weight:700;color:var(--primary)\">今日已签到</div>';\n      html += '<div style=\"font-size:13px;color:var(--muted);margin-top:8px\">连续签到 '+j.streak+' 天 · 当前积分 '+j.points+'</div>';\n    }else{\n      html += '<div style=\"font-size:14px;margin-bottom:16px\">连续签到 '+j.streak+' 天 · 当前积分 '+j.points+'</div>';\n      html += '<button class=\"btn\" onclick=\"doCheckin()\">立即签到</button>';\n      html += '<div style=\"font-size:12px;color:var(--muted);margin-top:12px\">每天签到 +5 积分，连续 7 天有额外加成<br>发帖 +5 · 回帖 +2 · 被点赞 +1 · 方案被采纳 +20</div>';\n    }\n    html += '</div>';\n    document.getElementById('checkin-body').innerHTML = html;\n  }catch(e){\n    document.getElementById('checkin-body').innerHTML = '<div class=\"hint\">'+esc(e.message)+'</div>';\n  }\n}\nasync function doCheckin(){\n  try{\n    const j = await api('/api/checkin', {method:'POST'});\n    if(j.already){\n      alert('今天已经签到过了');\n    }else{\n      alert('签到成功！+'+j.points+' 积分（连续 '+j.streak+' 天）');\n    }\n    hideModal();\n    updateCheckinBtn();\n    if(me) me.points = (me.points||0) + (j.points||0);\n  }catch(e){ alert(e.message); }\n}\nfunction toggleTheme(){\n  const dark = document.documentElement.dataset.theme !== 'dark';\n  document.documentElement.dataset.theme = dark ? 'dark' : '';\n  try{ localStorage.setItem('theme', dark ? 'dark' : 'light'); }catch(e){}\n  renderUserbar();\n}\n(function initTheme(){\n  let t = '';\n  try{ t = localStorage.getItem('theme') || ''; }catch(e){}\n  if(!t) t = 'dark';\n  if(t === 'dark') document.documentElement.dataset.theme = 'dark';\n})();\n/* ---------- 侧边栏 ---------- */\nfunction isMobile(){ return window.innerWidth < 1024; }\nasync function loadSidebar(){\n  try{\n    const j = await api('/api/boards');\n    const cur = location.pathname.match(/^\\/b\\/(\\d+)/);\n    const curId = cur ? Number(cur[1]) : 0;\n    let html = adHtml('home_sidebar_top');\n    html += '<div class=\"sb-title\">版块导航</div>';\n    html += '<div class=\"sb-board'+(curId===0?' on':'')+'\" onclick=\"navigate(\\'/\\');closeDrawer()\"><span>🏠 首页</span></div>';\n    j.boards.forEach(b=>{\n      html += '<div class=\"sb-board'+(b.id===curId?' on':'')+'\" onclick=\"navigate(\\'/b/'+b.id+'\\');closeDrawer()\">'+\n        '<span>'+esc(b.name)+'</span><span class=\"cnt\">'+b.thread_count+'</span></div>';\n    });\n    html += adHtml('home_sidebar_bottom');\n    document.getElementById('sidebar').innerHTML = html;\n    document.getElementById('layout').classList.add('has-sidebar');\n  }catch(e){}\n}\nfunction toggleSidebar(){\n  if(isMobile()){\n    document.getElementById('sidebar').classList.toggle('open');\n    document.getElementById('drawer-mask').classList.toggle('show');\n  }else{\n    const l = document.getElementById('layout');\n    l.classList.toggle('sidebar-collapsed');\n    try{ localStorage.setItem('sb-collapsed', l.classList.contains('sidebar-collapsed') ? '1' : '0'); }catch(e){}\n  }\n}\nfunction closeDrawer(){\n  document.getElementById('sidebar').classList.remove('open');\n  document.getElementById('drawer-mask').classList.remove('show');\n}\n(function initSidebar(){\n  try{\n    if(localStorage.getItem('sb-collapsed') === '1'){\n      document.getElementById('layout').classList.add('sidebar-collapsed');\n    }\n  }catch(e){}\n})();\nwindow.addEventListener('popstate', ()=>{ loadSidebar(); route(); });\n\nasync function loadDmCount(){\n  try{\n    const j = await api('/api/dm');\n    const dot = document.getElementById('dm-dot');\n    if(j.totalUnread > 0){ dot.style.display = ''; dot.textContent = j.totalUnread > 99 ? '99+' : j.totalUnread; }\n    else if(dot){ dot.style.display = 'none'; }\n  }catch(e){}\n}\nasync function loadNotifCount(){\n  try{\n    const j = await api('/api/notifications');\n    const dot = document.getElementById('notif-dot');\n    if(j.unread > 0){ dot.style.display = ''; dot.textContent = j.unread > 99 ? '99+' : j.unread; }\n    else if(dot){ dot.style.display = 'none'; }\n  }catch(e){}\n}\n/* 内容渲染：转义后支持外链图片、@高亮、**加粗**、*斜体*、`代码`、权限块 */\nfunction renderContent(s){\n  let h = esc(s);\n  h = h.replace(/```(\\w*)\\n([\\s\\S]*?)```/g, '<pre><code>$2</code></pre>');\n  h = h.replace(/^&gt; \\[quote pid=(\\d+) author=([^\\]]+) floor=([^\\]]+)\\]$/gm,\n    '<div class=\"quote-head\" onclick=\"goToPost($1)\" style=\"cursor:pointer\">📎 引用 @$2 <span style=\"color:var(--muted)\">#$3</span> <span style=\"font-size:12px\">👉 跳转</span></div>');\n  h = h.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');\n  h = h.replace(/!\\[([^\\]]*)\\]\\((https?:\\/\\/[^)\\s]+)\\)/g, '<img src=\"$2\" alt=\"$1\" loading=\"lazy\" referrerpolicy=\"no-referrer\" onclick=\"openLightbox(this)\">');\n  h = h.replace(/\\*\\*([^*]+)\\*\\*/g, '<b>$1</b>');\n  h = h.replace(/(^|[^*])\\*([^*\\n]+)\\*/g, '$1<i>$2</i>');\n  h = h.replace(/`([^`\\n]+)`/g, '<code style=\"background:var(--bg);padding:2px 8px;border-radius:4px;font-size:13px;font-family:monospace;border:1px solid var(--border)\">$1</code>');\n  h = h.replace(/@([a-zA-Z0-9_\\u4e00-\\u9fa5]{2,16})/g, '<span class=\"mention\">@$1</span>');\n  h = h.replace(/\\{\\{SHOW\\}\\}([\\s\\S]*?)\\{\\{\\/SHOW\\}\\}/g, '<div class=\"hide-show\"><div class=\"hide-tag\">🔓 隐藏内容</div>$1</div>');\n  h = h.replace(/\\{\\{HIDE\\}\\}/g, '<div class=\"hide-lock\">🔒 此处内容回复后可见</div>');\n  h = h.replace(/\\{\\{LEVEL:(\\d+)\\}\\}/g, '<div class=\"hide-lock\">🔒 需要 $1 积分可见（发帖回帖可攒积分）</div>');\n  h = h.replace(/\\{\\{ADMIN\\}\\}/g, '<div class=\"hide-lock\">🔒 仅管理员可见</div>');\n  // 裸 URL 自动转可点击链接（最后处理，避免破坏已生成的标签属性）\n  h = h.replace(/(^|[\\s>（(\\[{「『一-鿿])(https?:\\/\\/[^\\s<>\"'\\]）】」』，。！？；：一-鿿]+)/g, function(m, pre, url){\n    let trail = '';\n    while (url.length && /[.,!?;:]/.test(url.slice(-1))) { trail = url.slice(-1) + trail; url = url.slice(0, -1); }\n    // 右括号：只有多余（不成对）时才剥掉，保留 wikipedia 式 URL 里的括号\n    while (url.slice(-1) === ')' && (url.match(/\\(/g) || []).length < (url.match(/\\)/g) || []).length) { trail = ')' + trail; url = url.slice(0, -1); }\n    if (!url) return m;\n    return pre + '<a href=\"' + url + '\" target=\"_blank\" rel=\"noopener\">' + url + '</a>' + trail;\n  });\n  return h;\n}\n/* 编辑器工具栏 */\nfunction editorToolbar(targetId){\n  return '<div class=\"edtools\">'+\n    '<button type=\"button\" onclick=\"edWrap(\\''+targetId+'\\',\\'**\\',\\'**\\')\" title=\"加粗\"><b>B</b></button>'+\n    '<button type=\"button\" onclick=\"edWrap(\\''+targetId+'\\',\\'*\\',\\'*\\')\" title=\"斜体\"><i>I</i></button>'+\n    '<button type=\"button\" onclick=\"edWrap(\\''+targetId+'\\',\\'`\\',\\'`\\')\" title=\"代码\">`</button>'+\n    '<button type=\"button\" onclick=\"toggleEmojiPicker(\\''+targetId+'\\',this)\" title=\"表情\">😀</button>'+\n    '<button type=\"button\" onclick=\"insertImageLink(\\''+targetId+'\\')\" title=\"插入图片\">🖼️</button>'+\n    '<button type=\"button\" onclick=\"insertLink(\\''+targetId+'\\')\" title=\"插入链接\">🔗</button>'+\n    '<button type=\"button\" onclick=\"edInsert(\\''+targetId+'\\',\\'@\\')\" title=\"@提醒\">@</button>'+\n    '<button type=\"button\" onclick=\"edQuote(\\''+targetId+'\\')\" title=\"引用\">❝</button>'+\n    '<button type=\"button\" onclick=\"edWrap(\\''+targetId+'\\',\\'[hide]\\',\\'[/hide]\\')\" title=\"回复可见\">🔒</button>'+\n    '<button type=\"button\" onclick=\"edLevel(\\''+targetId+'\\')\" title=\"等级可见\">👑</button>'+\n  '</div><div class=\"emoji-picker\" id=\"ep-'+targetId+'\" style=\"display:none\"></div>';\n}\nconst EMOJIS = ['😀','😁','😂','🤣','😊','😍','😎','🤔','😅','😭','😡','👍','👎','👏','🙏','💪','🔥','🎉','❤️','💔','🐧','👀','💯','🤝','👋','✌️','🤷','😴','🤯','😱','🙄','😤','💡','⚠️','✅','❌','⭐','💻','🔧','📦','🎨','💬','📢'];\nfunction toggleEmojiPicker(targetId, btn){\n  const picker = document.getElementById('ep-'+targetId);\n  // 关闭其他已打开的\n  document.querySelectorAll('.emoji-picker').forEach(p=>{ if(p!==picker) p.style.display='none'; });\n  if(picker.style.display==='none'){\n    if(!picker.innerHTML){\n      picker.innerHTML = EMOJIS.map(e=>'<span style=\"font-size:24px;cursor:pointer;padding:4px;display:inline-block\" onclick=\"insertEmoji(\\''+targetId+'\\',\\''+e+'\\')\">'+e+'</span>').join('');\n    }\n    picker.style.display='block';\n  }else{\n    picker.style.display='none';\n  }\n}\nfunction insertEmoji(targetId, emoji){\n  edInsert(targetId, emoji);\n  document.getElementById('ep-'+targetId).style.display='none';\n}\nfunction edLevel(targetId){\n  const n = prompt('需要多少积分可见？（发帖+回帖数）', '50');\n  if(n === null) return;\n  const num = Math.max(1, parseInt(n) || 50);\n  edWrap(targetId, '[level='+num+']', '[/level]');\n}\nfunction edWrap(targetId, before, after){\n  const box = document.getElementById(targetId);\n  const s = box.selectionStart, e = box.selectionEnd;\n  const sel = box.value.slice(s, e) || '文字';\n  box.value = box.value.slice(0, s) + before + sel + after + box.value.slice(e);\n  box.focus();\n  box.selectionStart = s + before.length;\n  box.selectionEnd = s + before.length + sel.length;\n}\nfunction edInsert(targetId, text){\n  const box = document.getElementById(targetId);\n  const s = box.selectionStart;\n  box.value = box.value.slice(0, s) + text + box.value.slice(box.selectionEnd);\n  box.focus();\n  box.selectionStart = box.selectionEnd = s + text.length;\n}\nfunction edQuote(targetId){\n  const box = document.getElementById(targetId);\n  const s = box.selectionStart;\n  const lineStart = box.value.lastIndexOf('\\n', s - 1) + 1;\n  box.value = box.value.slice(0, lineStart) + '> ' + box.value.slice(lineStart);\n  box.focus();\n}\n/* 草稿自动保存 */\nfunction draftKey(id){ return 'draft-' + id; }\nfunction saveDraft(id){\n  try{\n    const box = document.getElementById(id === 'reply-box' ? 'reply-box' : id);\n    if(!box) return;\n    const key = box.dataset.draftKey;\n    if(!key) return;\n    if(box.value.trim()) localStorage.setItem(draftKey(key), box.value);\n    else localStorage.removeItem(draftKey(key));\n  }catch(e){}\n}\nfunction loadDraft(box, key){\n  try{\n    const v = localStorage.getItem(draftKey(key));\n    if(v){ box.value = v; return true; }\n  }catch(e){}\n  return false;\n}\nfunction clearDraft(key){\n  try{ localStorage.removeItem(draftKey(key)); }catch(e){}\n}\nfunction bindDraft(boxId, key){\n  const box = document.getElementById(boxId);\n  if(!box) return;\n  box.dataset.draftKey = key;\n  if(loadDraft(box, key)){\n    box.style.borderColor = 'var(--primary)';\n    setTimeout(()=>{ if(box) box.style.borderColor = ''; }, 1500);\n  }\n  box.addEventListener('input', ()=>saveDraft(boxId));\n}\nfunction insertImageLink(targetId){\n  const url = prompt('粘贴图片链接（https://…）：');\n  if(!url || !/^https?:\\/\\//.test(url.trim())) return;\n  const box = document.getElementById(targetId);\n  box.value += '\\n![](' + url.trim() + ')\\n';\n  box.focus();\n}\nfunction insertLink(targetId){\n  const url = prompt('粘贴链接（https://…）：');\n  if(!url || !/^https?:\\/\\//.test(url.trim())) return;\n  edInsert(targetId, url.trim() + ' ');\n}\n/* 图片灯箱 */\nlet lbImages = [], lbIndex = 0;\nfunction openLightbox(img){\n  const post = img.closest('.pc');\n  lbImages = [...post.querySelectorAll('img')].map(i => i.src);\n  lbIndex = lbImages.indexOf(img.src);\n  showLbImage();\n  document.getElementById('lightbox').classList.add('show');\n  document.body.style.overflow = 'hidden';\n}\nfunction showLbImage(){\n  document.getElementById('lb-img').src = lbImages[lbIndex];\n  document.getElementById('lb-count').textContent = (lbIndex + 1) + ' / ' + lbImages.length;\n}\nfunction lbNav(d){\n  lbIndex = (lbIndex + d + lbImages.length) % lbImages.length;\n  showLbImage();\n}\nfunction closeLightbox(){\n  document.getElementById('lightbox').classList.remove('show');\n  document.body.style.overflow = '';\n}\ndocument.addEventListener('keydown', e=>{\n  if(!document.getElementById('lightbox').classList.contains('show')) return;\n  if(e.key === 'Escape') closeLightbox();\n  if(e.key === 'ArrowLeft') lbNav(-1);\n  if(e.key === 'ArrowRight') lbNav(1);\n});\n/* @自动补全 */\nlet atBox = null, atTarget = null, atQuery = '', atIndex = 0, atUsers = [];\nfunction bindAtComplete(boxId){\n  const box = document.getElementById(boxId);\n  if(!box || box.dataset.atBound) return;\n  box.dataset.atBound = '1';\n  box.addEventListener('input', ()=>atOnInput(box));\n  box.addEventListener('keydown', e=>{\n    if(!atBox || atBox.style.display === 'none') return;\n    if(e.key === 'ArrowDown'){ e.preventDefault(); atIndex = (atIndex + 1) % atUsers.length; atRender(); }\n    else if(e.key === 'ArrowUp'){ e.preventDefault(); atIndex = (atIndex - 1 + atUsers.length) % atUsers.length; atRender(); }\n    else if(e.key === 'Enter' || e.key === 'Tab'){ e.preventDefault(); atSelect(atIndex); }\n    else if(e.key === 'Escape'){ atHide(); }\n  });\n  box.addEventListener('blur', ()=>setTimeout(atHide, 200));\n}\nasync function atOnInput(box){\n  const pos = box.selectionStart;\n  const before = box.value.slice(0, pos);\n  const m = before.match(/@([a-zA-Z0-9_\\u4e00-\\u9fa5]{1,16})$/);\n  if(!m){ atHide(); return; }\n  atTarget = box; atQuery = m[1]; atIndex = 0;\n  try{\n    const j = await api('/api/users/search?q=' + encodeURIComponent(atQuery));\n    atUsers = j.users.filter(u => u.name !== (me && me.name));\n    if(!atUsers.length){ atHide(); return; }\n    atRender();\n  }catch(e){ atHide(); }\n}\nfunction atRender(){\n  if(!atBox){\n    atBox = document.createElement('div');\n    atBox.className = 'at-list';\n    document.body.appendChild(atBox);\n  }\n  const r = atTarget.getBoundingClientRect();\n  atBox.style.left = (r.left + window.scrollX) + 'px';\n  atBox.style.top = (r.bottom + window.scrollY + 4) + 'px';\n  atBox.style.display = 'block';\n  atBox.innerHTML = atUsers.map((u, i)=>\n    '<div class=\"at-item'+(i===atIndex?' on':'')+'\" onmousedown=\"atSelect('+i+')\">'+avatarHtml(u.avatar_url, u.name)+esc(u.name)+'</div>'\n  ).join('');\n}\nfunction atHide(){ if(atBox) atBox.style.display = 'none'; }\nfunction atSelect(i){\n  const u = atUsers[i];\n  if(!u || !atTarget) return;\n  const pos = atTarget.selectionStart;\n  const before = atTarget.value.slice(0, pos);\n  const newBefore = before.replace(/@[a-zA-Z0-9_\\u4e00-\\u9fa5]{1,16}$/, '@' + u.name + ' ');\n  atTarget.value = newBefore + atTarget.value.slice(pos);\n  atTarget.focus();\n  atHide();\n  saveDraft(atTarget.id);\n}\nfunction authorLink(id, name){\n  return '<span class=\"au\" style=\"cursor:pointer\" onclick=\"event.stopPropagation();navigate(\\'/u/'+id+'\\')\">'+esc(name)+'</span>';\n}\nfunction userLevel(points){\n  const n = points || 0;\n  if(n >= 2000) return '开源领袖';\n  if(n >= 1000) return '企鹅大师';\n  if(n >= 600) return '内核探索者';\n  if(n >= 300) return 'Shell 玩家';\n  if(n >= 150) return '终端熟手';\n  if(n >= 50) return '企鹅学徒';\n  return '菜鸟企鹅';\n}\nfunction levelBadge(points){\n  return '<span style=\"font-size:11px;color:#d97706;background:#fef3c7;border-radius:4px;padding:1px 6px;margin-left:4px\">'+userLevel(points)+'</span>';\n}\n// 兼容旧调用\nfunction levelBadgeByCount(threadCount, postCount){\n  return levelBadge((threadCount||0) + (postCount||0));\n}\nfunction avatarHtml(url, name, size, frame){\n  const frameStyle = frame ? 'box-shadow:0 0 0 3px #f59e0b,0 0 12px #f59e0b;' : '';\n  if(url && /^https?:\\/\\//.test(url)){\n    return '<img src=\"'+esc(url)+'\" class=\"'+(size==='big'?'avatar-big':'avatar-img')+'\" style=\"'+frameStyle+'\" referrerpolicy=\"no-referrer\" onerror=\"this.style.display=\\'none\\')\">';\n  }\n  return '<span class=\"'+(size==='big'?'avatar-big-letter':'avatar-letter')+'\" style=\"'+frameStyle+'\">'+esc((name||'?').slice(0,1))+'</span>';\n}\nfunction showModal(html){\n  document.getElementById('modal-box').innerHTML = '<span class=\"x\" onclick=\"hideModal()\">×</span>' + html;\n  document.getElementById('modal').classList.add('show');\n}\nfunction hideModal(){ document.getElementById('modal').classList.remove('show'); }\ndocument.getElementById('modal').onclick = e=>{ if(e.target.id==='modal') hideModal(); };\n\n/* Turnstile 人机验证 */\nlet turnstileWidgetId = null;\nfunction turnstileSitekey(){ return (siteSettings.turnstile_sitekey || ''); }\nfunction renderTurnstile(containerId){\n  const key = turnstileSitekey();\n  if(!key) return;\n  const load = ()=>{\n    if(typeof turnstile === 'undefined'){ setTimeout(load, 300); return; }\n    try{ if(turnstileWidgetId !== null) turnstile.remove(turnstileWidgetId); }catch(e){}\n    turnstileWidgetId = turnstile.render('#'+containerId, { sitekey: key, theme: 'auto', language: 'zh-CN' });\n  };\n  if(typeof turnstile === 'undefined'){\n    const s = document.createElement('script');\n    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';\n    s.async = true; s.defer = true;\n    s.onload = load;\n    document.head.appendChild(s);\n  } else load();\n}\nfunction getTurnstileToken(){\n  const key = turnstileSitekey();\n  if(!key) return '';\n  try{ return turnstile.getResponse(turnstileWidgetId) || ''; }catch(e){ return ''; }\n}\nfunction resetTurnstile(){\n  try{ if(turnstileWidgetId !== null) turnstile.reset(turnstileWidgetId); }catch(e){}\n}\nfunction turnstileDiv(){\n  return turnstileSitekey() ? '<div id=\"ts-widget\" style=\"margin:8px 0;display:flex;justify-content:center\"></div>' : '';\n}\nfunction showLogin(){\n  showModal('<h3>登录</h3><div class=\"err\" id=\"m-err\"></div>'+\n    '<input type=\"text\" id=\"m-name\" placeholder=\"用户名\" autocomplete=\"username\">'+\n    '<input type=\"password\" id=\"m-pass\" placeholder=\"密码\" autocomplete=\"current-password\">'+\n    turnstileDiv()+\n    '<div class=\"row\"><button class=\"btn ghost\" onclick=\"hideModal()\">取消</button><button class=\"btn\" onclick=\"doLogin()\">登录</button></div>'+\n    (siteSettings.github_oauth ? '<div style=\"text-align:center;margin:12px 0 4px;color:var(--muted);font-size:12px\">— 或 —</div>'+\n    '<button class=\"btn ghost\" style=\"width:100%;display:flex;align-items:center;justify-content:center;gap:8px\" onclick=\"location.href=\\'/api/auth/github\\'\">'+\n    '<svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"currentColor\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"/></svg>'+\n    '使用 GitHub 登录</button>' : '')+\n    '<div style=\"text-align:center;margin-top:10px\"><a style=\"font-size:13px;color:var(--primary);cursor:pointer\" onclick=\"showForgot()\">忘记密码？</a></div>');\n  renderTurnstile('ts-widget');\n}\nfunction showForgot(){\n  showModal('<h3>找回密码</h3><div class=\"err\" id=\"m-err\"></div>'+\n    '<div style=\"font-size:13px;color:var(--muted);margin-bottom:10px\">输入注册邮箱，我们会发送重置链接</div>'+\n    '<input type=\"text\" id=\"m-email\" placeholder=\"注册邮箱\" autocomplete=\"email\">'+\n    '<div class=\"row\"><button class=\"btn ghost\" onclick=\"hideModal()\">取消</button><button class=\"btn\" onclick=\"doForgot()\">发送</button></div>');\n}\nasync function doForgot(){\n  const email = document.getElementById('m-email').value.trim();\n  try{\n    await api('/api/forgot-password', {method:'POST', body:JSON.stringify({email})});\n    showModal('<h3>已发送</h3><p style=\"font-size:14px;line-height:1.8;margin-bottom:14px\">如果该邮箱已注册，重置链接已发送，请查收（1小时内有效）。</p>'+\n      '<button class=\"btn\" onclick=\"hideModal()\">知道了</button>');\n  }catch(e){ document.getElementById('m-err').textContent = e.message; }\n}\nasync function doLogin(){\n  const name = document.getElementById('m-name').value.trim();\n  const pass = document.getElementById('m-pass').value;\n  try{ await api('/api/login',{method:'POST',body:JSON.stringify({name,password:pass,turnstile_token:getTurnstileToken()})}); resetTurnstile(); hideModal(); await refreshMe(); route(); }\n  catch(e){ document.getElementById('m-err').textContent = e.message; }\n}\nfunction showRegister(){\n  showModal('<h3>注册</h3><div class=\"err\" id=\"m-err\"></div>'+\n    '<input type=\"text\" id=\"m-name\" placeholder=\"用户名（2-16位，中文/字母/数字/下划线）\" autocomplete=\"username\">'+\n    '<input type=\"text\" id=\"m-email\" placeholder=\"邮箱（用于验证）\" autocomplete=\"email\">'+\n    '<input type=\"password\" id=\"m-pass\" placeholder=\"密码（4位以上）\" autocomplete=\"new-password\">'+\n    turnstileDiv()+\n    '<div style=\"font-size:12px;color:var(--muted);margin-bottom:10px\">注册即表示同意<a style=\"color:var(--primary);cursor:pointer\" onclick=\"hideModal();navigate(\\'/rules\\')\">《社区规范》</a></div>'+\n    '<div class=\"row\"><button class=\"btn ghost\" onclick=\"hideModal()\">取消</button><button class=\"btn\" onclick=\"doRegister()\">注册</button></div>'+\n    (siteSettings.github_oauth ? '<div style=\"text-align:center;margin:12px 0 4px;color:var(--muted);font-size:12px\">— 或 —</div>'+\n    '<button class=\"btn ghost\" style=\"width:100%;display:flex;align-items:center;justify-content:center;gap:8px\" onclick=\"location.href=\\'/api/auth/github\\'\">'+\n    '<svg width=\"18\" height=\"18\" viewBox=\"0 0 16 16\" fill=\"currentColor\"><path d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"/></svg>'+\n    '使用 GitHub 一键注册</button>' : ''));\n  renderTurnstile('ts-widget');\n}\nasync function doRegister(){\n  const name = document.getElementById('m-name').value.trim();\n  const email = document.getElementById('m-email').value.trim();\n  const pass = document.getElementById('m-pass').value;\n  try{\n    const j = await api('/api/register',{method:'POST',body:JSON.stringify({name,email,password:pass,turnstile_token:getTurnstileToken()})}); resetTurnstile();\n    hideModal(); await refreshMe();\n    if(j.mailSent && me && !me.verified){\n      showModal('<h3>验证邮箱</h3><p style=\"font-size:14px;line-height:1.8;margin-bottom:14px\">验证邮件已发送到 <b>'+esc(email)+'</b>，请点击邮件中的链接完成验证。</p>'+\n        '<button class=\"btn\" onclick=\"hideModal()\">知道了</button>');\n    }\n    route();\n  }\n  catch(e){ document.getElementById('m-err').textContent = e.message; }\n}\nasync function resendVerification(){\n  try{ await api('/api/resend-verification',{method:'POST'}); alert('验证邮件已重新发送，请查收'); }\n  catch(e){ alert(e.message); }\n}\nfunction verifyBanner(){\n  if(me && !me.verified){\n    return '<div class=\"card\" style=\"border-color:#f59e0b;background:#fffbeb\">📧 邮箱未验证，发帖、回帖、私信功能受限。<button class=\"btn ghost\" style=\"width:auto;padding:6px 12px;font-size:13px;margin-left:8px\" onclick=\"resendVerification()\">重发验证邮件</button></div>';\n  }\n  return '';\n}\nasync function logout(){ await api('/api/logout',{method:'POST'}); me=null; renderUserbar(); route(); }\n\n/* ---------- 路由（History API） ---------- */\nfunction navigate(path){\n  history.pushState({}, '', path);\n  loadSidebar();\n  route();\n  window.scrollTo(0, 0);\n}\nasync function route(){\n  const h = location.pathname + location.search;\n\n  document.getElementById('searchbar').style.display = (h === '/' || h.startsWith('/search')) ? '' : 'none';\n  let m;\n  if(m = h.match(/^\\/verify\\?token=([\\w-]+)/)) return viewVerify(m[1]);\n  if(m = h.match(/^\\/reset\\?token=([\\w-]+)/)) return viewReset(m[1]);\n  if(m = h.match(/^\\/search\\?q=(.*)/)) return viewSearch(decodeURIComponent(m[1]));\n  if(h === '/notifications') return viewNotifications();\n  if(h === '/settings') return viewSettings();\n  if(h === '/favorites') return viewFavorites();\n  if(h === '/rules') return viewRules();\n  if(h === '/dm') return viewDmList();\n  if(m = h.match(/^\\/dm\\/(\\d+)/)) return viewDmChat(Number(m[1]));\n  if(h === '/admin') return viewAdmin('stats');\n  if(m = h.match(/^\\/admin\\/(users|boards|site|reports|words|logs|ads|links|shop)/)) return viewAdmin(m[1]);\n  if(h === '/tools') return viewTools();\n  if(h === '/rankings') return viewRankings();\n  if(h === '/shop') return viewShop();\n  if(m = h.match(/^\\/shop\\/(\\d+)$/)) return viewShopDetail(Number(m[1]));\n  if(h === '/tools/diff') return viewDiffTool();\n  if(h === '/tools/distro') return viewDistroTool();\n  if(h === '/tools/shellcheck') return viewShellcheckTool();\n  if(m = h.match(/^\\/tools\\/explain(?:\\?cmd=(.*))?/)) return viewExplainTool(m[1] ? decodeURIComponent(m[1]) : '');\n  if(h === '/tools/quiz' || h.match(/^\\/tools\\/quiz\\?score=/) || h === '/tools/level') return viewQuiz();\n  if(m = h.match(/^\\/u\\/(\\d+)/)) return viewProfile(Number(m[1]));\n  if(m = h.match(/^\\/b\\/(\\d+)(?:\\?p=(\\d+))?/)) return viewThreads(Number(m[1]), Number(m[2]||1));\n  if(m = h.match(/^\\/t\\/(\\d+)(?:\\?p=(\\d+))?/)) return viewThread(Number(m[1]), Number(m[2]||1));\n  return viewBoards();\n}\nfunction doSearch(){\n  const q = document.getElementById('q').value.trim();\n  if(q) navigate('/search?q=' + encodeURIComponent(q));\n}\nasync function viewSearch(q){\n  setTitle('搜索');\n  try{ document.getElementById('q').value = q; }catch(e){}\n  app.innerHTML = '<div class=\"hint\">搜索中…</div>';\n  let j;\n  try{ j = await api('/api/search?q=' + encodeURIComponent(q)); }\n  catch(e){ app.innerHTML = '<div class=\"hint\">搜索失败：'+esc(e.message)+' <a href=\"javascript:route()\">重试</a></div>'; return; }\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 全部版块</div>';\n  html += '<div class=\"card\"><h2 class=\"tt\">搜索：'+esc(q)+'</h2><div style=\"font-size:13px;color:var(--muted)\">找到 '+j.results.length+' 个主题</div>';\n  if(!j.results.length) html += '<div class=\"hint\">没有找到相关主题，换个关键词试试</div>';\n  j.results.forEach(t=>{\n    html += '<div class=\"thread\" onclick=\"navigate(\\'/t/'+t.id+'\\')\">'+\n      '<div class=\"ti\">'+(t.is_digest?'<span class=\"pin\" style=\"color:#d97706;border-color:#d97706\">精华</span>':'')+(t.is_locked?'<span class=\"pin\" style=\"color:#6b7280;border-color:#6b7280\">🔒</span>':'')+esc(t.title)+'</div>'+\n      '<div class=\"mt\"><span style=\"cursor:pointer;color:var(--primary)\" onclick=\"event.stopPropagation();navigate(\\'/u/'+t.user_id+'\\')\">'+esc(t.author)+'</span><span>'+esc(t.board_name)+'</span><span>'+t.reply_count+' 回复</span><span>'+timeAgo(t.updated_at)+'</span></div></div>';\n  });\n  html += '</div>';\n  app.innerHTML = html;\n}\n\n/* ---------- 通知中心 ---------- */\nasync function viewNotifications(){\n  setTitle('通知');\n  if(!me){ showLogin(); return; }\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  try{\n    const j = await api('/api/notifications');\n    let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 全部版块</div>';\n    html += '<div class=\"card\"><h2 class=\"tt\">通知</h2>';\n    if(!j.notifications.length) html += '<div class=\"hint\">还没有人 @ 你</div>';\n    j.notifications.forEach(n=>{\n      const target = n.post_id\n        ? 'goToPost('+n.post_id+')'\n        : 'navigate(\\'/t/'+n.thread_id+'\\'';\n      const text = n.type === 'reply'\n        ? '<b>'+esc(n.from_name)+'</b> 回复了你的主题「'+esc(n.thread_title)+'」'\n        : '<b>'+esc(n.from_name)+'</b> 在「'+esc(n.thread_title)+'」中 @ 了你';\n      html += '<div class=\"notif'+(n.is_read?'':' unread')+'\" onclick=\"'+target+'\">'+text+\n        '<div class=\"tm\">'+timeAgo(n.created_at)+'</div></div>';\n    });\n    html += '</div>';\n    app.innerHTML = html;\n    if(j.unread > 0){ await api('/api/notifications/read', {method:'POST'}); loadNotifCount(); }\n  }catch(e){\n    app.innerHTML = '<div class=\"hint\">加载失败：'+esc(e.message)+' <a href=\"javascript:route()\">重试</a></div>';\n  }\n}\n\n/* ---------- 个人设置 ---------- */\nasync function viewSettings(){\n  setTitle('设置');\n  if(!me){ showLogin(); return; }\n  await refreshMe();\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 全部版块</div>';\n  html += '<div class=\"card\"><h2 class=\"tt\">个人设置</h2>'+\n    '<div class=\"toolbar\"><button class=\"btn ghost\" onclick=\"navigate(\\'/favorites\\')\">★ 我的收藏</button>'+\n    '<button class=\"btn ghost\" onclick=\"navigate(\\'/u/'+me.id+'\\')\">👤 我的主页</button></div>'+\n    '<div style=\"text-align:center;margin:16px 0\" id=\"avatar-preview\">'+avatarHtml(me.avatar_url, me.name, 'big')+'</div>'+\n    '<div class=\"setrow\"><label>头像链接（https://…，留空用默认字母头像）</label>'+\n    '<input type=\"text\" id=\"s-avatar\" placeholder=\"https://…\" value=\"'+esc(me.avatar_url||'')+'\" oninput=\"document.getElementById(\\'avatar-preview\\').innerHTML=avatarHtml(this.value,\\''+esc(me.name).replace(/'/g,\"\\\\'\")+'\\',\\'big\\')\"></div>'+\n    '<div class=\"setrow\"><label>个人简介（最多 200 字）</label>'+\n    '<input type=\"text\" id=\"s-bio\" placeholder=\"介绍一下自己…\" value=\"'+esc(me.bio||'')+'\"></div>'+\n    '<button class=\"btn\" onclick=\"saveProfile()\">保存资料</button></div>';\n  html += '<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px\">修改密码</h2><div class=\"err\" id=\"pw-err\"></div>'+\n    '<div class=\"setrow\"><label>原密码</label><input type=\"password\" id=\"s-oldpass\"></div>'+\n    '<div class=\"setrow\"><label>新密码（4-64 位）</label><input type=\"password\" id=\"s-newpass\"></div>'+\n    '<button class=\"btn\" onclick=\"changePassword()\">修改密码</button></div>';\n  html += '<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px\">第三方登录</h2><div id=\"oauth-bindings\"><div style=\"color:var(--muted);font-size:13px\">加载中…</div></div></div>';\n  loadOauthBindings();\n  html += '<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px\">更换邮箱</h2><div class=\"err\" id=\"em-err\"></div>'+\n    '<div style=\"font-size:13px;color:var(--muted);margin-bottom:8px\">当前：'+esc(me.email||'')+(me.verified?'（已验证）':'（未验证）')+'</div>'+\n    '<div class=\"setrow\"><label>新邮箱（更换后需重新验证）</label><input type=\"text\" id=\"s-email\" placeholder=\"new@example.com\"></div>'+\n    '<button class=\"btn\" onclick=\"changeEmail()\">更换邮箱</button></div>';\n  app.innerHTML = html;\n}\nasync function saveProfile(){\n  const avatar_url = document.getElementById('s-avatar').value.trim();\n  const bio = document.getElementById('s-bio').value.trim();\n  try{\n    await api('/api/me', {method:'PUT', body:JSON.stringify({avatar_url, bio})});\n    await refreshMe(); route();\n  }catch(e){ alert(e.message); }\n}\nasync function changePassword(){\n  const old_password = document.getElementById('s-oldpass').value;\n  const new_password = document.getElementById('s-newpass').value;\n  try{\n    await api('/api/me/password', {method:'PUT', body:JSON.stringify({old_password, new_password})});\n    alert('密码修改成功');\n    document.getElementById('s-oldpass').value = '';\n    document.getElementById('s-newpass').value = '';\n  }catch(e){ document.getElementById('pw-err').textContent = e.message; }\n}\nasync function loadOauthBindings(){\n  const box = document.getElementById('oauth-bindings');\n  if(!box) return;\n  try{\n    const j = await api('/api/oauth/bindings');\n    let h = '';\n    const gh = (j.bindings||[]).find(b=>b.provider==='github');\n    if(gh){\n      h += '<div style=\"display:flex;align-items:center;gap:10px;padding:8px 0\">'\n        + '<span style=\"font-size:14px\">🐙 GitHub 已绑定</span>'\n        + '<span style=\"font-size:12px;color:var(--muted)\">'+new Date(gh.created_at).toLocaleDateString()+'</span>'\n        + '<button class=\"btn ghost\" style=\"width:auto;padding:4px 12px;font-size:12px\" onclick=\"unbindOauth(\\'github\\')\">解绑</button></div>';\n    }else if(j.githubConfigured){\n      h += '<div style=\"padding:8px 0\"><button class=\"btn ghost\" style=\"width:auto\" onclick=\"location.href=\\'/api/auth/github\\'\">🐙 绑定 GitHub</button></div>';\n    }\n    if(!h) h = '<div style=\"color:var(--muted);font-size:13px\">暂无可用的第三方登录</div>';\n    box.innerHTML = h;\n  }catch(e){ box.innerHTML = '<div style=\"color:var(--muted);font-size:13px\">加载失败</div>'; }\n}\nasync function unbindOauth(provider){\n  if(!confirm('确定解绑 '+provider+' 吗？')) return;\n  try{ await api('/api/oauth/unbind',{method:'POST',body:JSON.stringify({provider})}); loadOauthBindings(); }\n  catch(e){ alert(e.message); }\n}\nasync function changeEmail(){\n  const email = document.getElementById('s-email').value.trim();\n  if(!confirm('更换邮箱后需要重新验证，确定吗？')) return;\n  try{\n    const j = await api('/api/me/email', {method:'PUT', body:JSON.stringify({email})});\n    await refreshMe();\n    alert(j.mailSent ? '验证邮件已发送到新邮箱，请查收' : '邮箱已更换');\n    route();\n  }catch(e){ document.getElementById('em-err').textContent = e.message; }\n}\n\n/* ---------- 我的收藏 ---------- */\nasync function viewFavorites(){\n  setTitle('我的收藏');\n  if(!me){ showLogin(); return; }\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  let j;\n  try{ j = await api('/api/me/favorites'); }\n  catch(e){ app.innerHTML = '<div class=\"hint\">加载失败：'+esc(e.message)+' <a href=\"javascript:route()\">重试</a></div>'; return; }\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 全部版块</div>';\n  html += '<div class=\"card\"><h2 class=\"tt\">我的收藏</h2>';\n  if(!j.favorites.length) html += '<div class=\"hint\">还没有收藏任何主题</div>';\n  j.favorites.forEach(t=>{\n    html += '<div class=\"thread\" onclick=\"navigate(\\'/t/'+t.id+'\\')\">'+\n      '<div class=\"ti\">'+(t.is_digest?'<span class=\"pin\" style=\"color:#d97706;border-color:#d97706\">精华</span>':'')+(t.is_locked?'<span class=\"pin\" style=\"color:#6b7280;border-color:#6b7280\">🔒</span>':'')+esc(t.title)+'</div>'+\n      '<div class=\"mt\"><span>'+esc(t.author)+'</span><span>'+esc(t.board_name)+'</span><span>'+t.reply_count+' 回复</span><span>'+timeAgo(t.updated_at)+'</span></div></div>';\n  });\n  html += '</div>';\n  app.innerHTML = html;\n}\n\n/* ---------- 社区规范 ---------- */\nfunction viewRules(){\n  setTitle('社区规范');\n  app.innerHTML = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 首页</div>'+\n  '<div class=\"card\"><h2 class=\"tt\">社区规范</h2>'+\n  '<div style=\"font-size:14px;line-height:2\">'+\n  '<h3 style=\"font-size:15px;margin:16px 0 8px\">一、基本准则</h3>'+\n  '<p>1. 遵守国家法律法规，不得发布违法违规内容。<br>2. 尊重他人，不得人身攻击、辱骂、歧视。<br>3. 不得发布广告、垃圾信息、恶意链接。</p>'+\n  '<h3 style=\"font-size:15px;margin:16px 0 8px\">二、发帖规范</h3>'+\n  '<p>1. 标题清晰，内容充实，不发无意义的水帖。<br>2. 转载请注明出处，尊重原创。<br>3. 图片请使用合法外链，不得上传违规图片。</p>'+\n  '<h3 style=\"font-size:15px;margin:16px 0 8px\">三、违规处理</h3>'+\n  '<p>1. 首次违规：警告并删除内容。<br>2. 多次违规：禁言 7 天。<br>3. 严重违规（涉黄赌毒、诈骗等）：永久封禁并保留证据。<br>4. 对处理结果有异议，可联系管理员申诉。</p>'+\n  '<h3 style=\"font-size:15px;margin:16px 0 8px\">四、举报</h3>'+\n  '<p>发现违规内容请点击「举报」，管理员会在 24 小时内处理。恶意举报同样会被处罚。</p>'+\n  '</div></div>';\n}\n\n/* ---------- 工具中心 ---------- */\nfunction trackTool(tool){\n  api('/api/tool-visit', {method:'POST', body:JSON.stringify({tool})}).catch(()=>{});\n}\n/* ---------- 排行榜 ---------- */\nlet rankType = 'points', rankPeriod = 'all';\nfunction viewRankings(){\n  setTitle('排行榜');\n  const types = [['points','💰 积分榜'],['threads','📝 发帖榜'],['replies','💬 回帖榜'],['activity','🔥 活跃榜']];\n  const periods = [['all','总榜'],['month','月榜'],['week','周榜']];\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 首页</div>'+\n    '<div class=\"card\"><h2 class=\"tt\">🏆 排行榜</h2>'+\n    '<div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px\">'+\n    types.map(t=>'<button class=\"btn '+(rankType===t[0]?'':'ghost')+'\" style=\"width:auto;padding:8px 14px;font-size:13px\" onclick=\"rankType=\\''+t[0]+'\\';viewRankings()\">'+t[1]+'</button>').join('')+\n    '</div><div style=\"display:flex;gap:8px;margin-bottom:16px\">'+\n    periods.map(p=>'<button class=\"btn '+(rankPeriod===p[0]?'':'ghost')+'\" style=\"width:auto;padding:6px 12px;font-size:12px\" onclick=\"rankPeriod=\\''+p[0]+'\\';viewRankings()\">'+p[1]+'</button>').join('')+\n    '</div><div id=\"rank-list\"><div class=\"hint\">加载中…</div></div></div>';\n  app.innerHTML = html;\n  api('/api/rankings?type='+rankType+'&period='+rankPeriod).then(j=>{\n    const box = document.getElementById('rank-list');\n    if(!box) return;\n    if(!j.rankings || !j.rankings.length){ box.innerHTML = '<div class=\"hint\">暂无数据</div>'; return; }\n    const medals = ['🥇','🥈','🥉'];\n    const unit = rankType==='points' ? '分' : rankType==='threads' ? '帖' : rankType==='replies' ? '条' : '度';\n    box.innerHTML = j.rankings.map((u,i)=>\n      '<div style=\"display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer\" onclick=\"navigate(\\'/u/'+u.id+'\\')\">'+\n      '<span style=\"font-size:18px;width:28px;text-align:center\">'+(medals[i]||(i+1))+'</span>'+\n      avatarHtml(u.avatar_url, u.name, '')+\n      '<span style=\"flex:1\"><b>'+esc(u.name)+'</b>'+(u.custom_title?' <span style=\"font-size:11px;color:var(--primary);border:1px solid var(--primary);border-radius:4px;padding:0 4px\">'+esc(u.custom_title)+'</span>':'')+'</span>'+\n      '<b style=\"color:var(--primary)\">'+u.score+' '+unit+'</b></div>'\n    ).join('');\n  }).catch(()=>{ const b=document.getElementById('rank-list'); if(b) b.innerHTML='<div class=\"hint\">加载失败</div>'; });\n}\n/* ---------- 积分商城 ---------- */\nfunction viewShop(){\n  setTitle('积分商城');\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 首页</div>'+\n    '<div class=\"card\"><h2 class=\"tt\">🛒 积分商城</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted);margin-bottom:16px\">用积分兑换专属特权 '+(me?'· 当前 <b style=\"color:var(--primary)\">'+(me.points||0)+' 分</b>':'· <a href=\"javascript:navigate(\\'/login\\')\" style=\"color:var(--primary)\">登录查看积分</a>')+'</div>'+\n    '<div id=\"shop-list\"><div class=\"hint\">加载中…</div></div></div>'+\n    (me?'<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px\">🎒 我的物品</h2><div id=\"my-items\"><div class=\"hint\">加载中…</div></div></div>':'');\n  app.innerHTML = html;\n  api('/api/shop/items').then(j=>{\n    const box = document.getElementById('shop-list');\n    if(!box) return;\n    box.innerHTML = '<div style=\"display:grid;gap:12px\">'+j.items.map(it=>{\n      let stockHtml = '';\n      let canBuy = true;\n      if(it.item_type==='card'){\n        stockHtml = '<div style=\"font-size:12px;color:'+(it.stock>0?'var(--muted)':'#ef4444')+'\">库存 '+it.stock+'</div>';\n        if(it.stock<=0) canBuy = false;\n      }\n      let desc = esc(it.descr);\n      if(it.item_type==='pin_card' && it.params && it.params.duration_hours){\n        desc += '（置顶 '+it.params.duration_hours+' 小时）';\n      }\n      return '<div style=\"display:flex;gap:12px;align-items:center;padding:12px;border:1px solid var(--border);border-radius:10px;cursor:pointer\" onclick=\"navigate(\\'/shop/'+it.id+'\\')\">'+\n      '<span style=\"font-size:32px\">'+it.icon+'</span>'+\n      '<div style=\"flex:1\"><div style=\"font-weight:700\">'+esc(it.name)+'</div>'+\n      '<div style=\"font-size:13px;color:var(--muted)\">'+desc+'</div>'+stockHtml+'</div>'+\n      '<div style=\"text-align:center\"><div style=\"font-weight:700;color:var(--primary);margin-bottom:6px\">'+it.price+' 分</div>'+\n      '<span style=\"font-size:13px;color:var(--primary)\">查看详情 ›</span></div></div>';\n    }).join('')+'</div>';\n  });\n  if(me){\n    api('/api/shop/my-items').then(j=>{\n      const box = document.getElementById('my-items');\n      if(!box) return;\n      if(!j.items.length){ box.innerHTML = '<div class=\"hint\">还没有物品，去上面兑换吧</div>'; return; }\n      window._myItems = j.items;\n      box.innerHTML = j.items.map(it=>{\n        let extraHtml = '';\n        if(it.item_type==='card' && it.extra){\n          extraHtml = '<div style=\"font-size:13px;margin-top:4px\"><span style=\"color:var(--muted)\">兑换码：</span><code style=\"background:var(--hover);padding:2px 8px;border-radius:4px;user-select:all\">'+esc(it.extra)+'</code> <button class=\"btn ghost\" style=\"width:auto;padding:2px 8px;font-size:12px\" onclick=\"navigator.clipboard.writeText(\\''+esc(it.extra).replace(/'/g,\"\\\\'\")+'\\').then(()=>alert(\\'已复制\\'))\">复制</button></div>';\n        }\n        const showUse = !it.used && it.item_type!=='card';\n        return '<div style=\"display:flex;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)\">'+\n        '<span style=\"font-size:24px\">'+it.icon+'</span>'+\n        '<div style=\"flex:1\"><b>'+esc(it.name)+'</b>'+\n        (it.item_type==='card'?'':(it.used?'<span style=\"font-size:12px;color:var(--muted)\"> · 已使用</span>':'<span style=\"font-size:12px;color:var(--primary)\"> · 未使用</span>'))+extraHtml+'</div>'+\n        (showUse?'<button class=\"btn ghost\" style=\"width:auto;padding:6px 12px;font-size:13px\" onclick=\"useItem('+it.id+',\\''+it.item_type+'\\')\">使用</button>':'')+'</div>';\n      }).join('');\n    });\n  }\n}\nasync function viewShopDetail(id){\n  setTitle('商品详情');\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  let item;\n  try{\n    const j = await api('/api/shop/items');\n    item = (j.items || []).find(x => x.id === id);\n  }catch(e){}\n  if(!item){\n    app.innerHTML = '<div class=\"crumb\" onclick=\"navigate(\\'/shop\\')\">‹ 积分商城</div><div class=\"card\"><div class=\"hint\">商品不存在或已下架</div></div>';\n    return;\n  }\n  setTitle(item.name);\n  const typeDesc = {\n    pin_card: '📌 置顶卡：使用后选择自己的一篇帖子置顶，让更多人看到。',\n    rename_card: '✏️ 改名卡：使用后可修改一次用户名，30 天内限用 1 次。',\n    avatar_frame: '🖼️ 头像框：使用后获得金色头像框，全站展示。',\n    custom_title: '👑 自定义头衔：使用后可设置专属头衔（最多20字），显示在名字旁边。',\n    card: '🎟️ 卡密商品：兑换后系统自动分配一个兑换码，请妥善保管。'\n  };\n  // 优先显示后台填写的使用说明，没有才用默认\n  const usageHtml = item.usage\n    ? '<div style=\"font-size:14px;line-height:1.8;color:var(--text);white-space:pre-wrap\">'+esc(item.usage)+'</div>'\n    : '<div style=\"font-size:14px;line-height:1.8;color:var(--text)\">'+(typeDesc[item.item_type] || '兑换后在\"我的物品\"中查看使用。')+'</div>';\n  let extraInfo = '';\n  if(item.item_type === 'pin_card' && item.params && item.params.duration_hours){\n    extraInfo = '<div class=\"setrow\"><label>置顶时长</label><div>'+item.params.duration_hours+' 小时</div></div>';\n  }\n  if(item.item_type === 'card'){\n    extraInfo = '<div class=\"setrow\"><label>库存</label><div style=\"color:'+(item.stock>0?'var(--primary)':'#ef4444')+'\">'+(item.stock>0 ? '剩余 '+item.stock+' 件' : '已售罄')+'</div></div>';\n  }\n  const canBuy = me && (item.item_type !== 'card' || item.stock > 0);\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/shop\\')\">‹ 积分商城</div>'+\n    '<div class=\"card\" style=\"text-align:center;padding:32px 20px\">'+\n    '<div style=\"font-size:64px;margin-bottom:12px\">'+item.icon+'</div>'+\n    '<div style=\"font-size:24px;font-weight:800;margin-bottom:8px\">'+esc(item.name)+'</div>'+\n    (item.descr ? '<div style=\"font-size:14px;color:var(--muted);margin-bottom:16px\">'+esc(item.descr)+'</div>' : '')+\n    '<div style=\"font-size:28px;font-weight:800;color:var(--primary);margin-bottom:20px\">'+item.price+' <span style=\"font-size:14px\">积分</span></div>'+\n    (me ? '<div style=\"font-size:13px;color:var(--muted);margin-bottom:16px\">当前积分：<b style=\"color:var(--primary)\">'+(me.points||0)+'</b></div>' : '<div style=\"font-size:13px;color:var(--muted);margin-bottom:16px\"><a href=\"javascript:showLogin()\" style=\"color:var(--primary)\">登录</a>后兑换</div>')+\n    (canBuy ? '<button class=\"btn\" style=\"width:auto;padding:12px 48px;font-size:16px\" onclick=\"buyItem('+item.id+','+item.price+')\">立即兑换</button>'\n      : (me ? '<button class=\"btn\" disabled style=\"width:auto;padding:12px 48px;font-size:16px;opacity:.5\">已售罄</button>' : ''))+\n    '</div>'+\n    '<div class=\"card\"><h3 style=\"margin-bottom:12px\">📖 使用说明</h3>'+\n    usageHtml+extraInfo+'</div>';\n  app.innerHTML = html;\n}\nasync function buyItem(id, price){\n  if(!confirm('确定花 '+price+' 积分兑换吗？')) return;\n  try{\n    const j = await api('/api/shop/buy', {method:'POST', body:JSON.stringify({item_id:id})});\n    if(j.ok){\n      if(j.code){ alert('兑换成功！\\n\\n你的兑换码：'+j.code+'\\n\\n已保存到\"我的物品\"，请妥善保管。'); }\n      else alert('兑换成功！');\n      viewShop(); refreshMe();\n    }\n  }catch(e){ alert(e.message); }\n}\nasync function useItem(id, type){\n  let extra = '', thread_id = null;\n  // 从缓存取商品 params（置顶时长）\n  const _it = (window._myItems || []).find(x => x.id === id);\n  let _hours = 24;\n  try{ const p = JSON.parse((_it && _it.params) || '{}'); if(p.duration_hours) _hours = p.duration_hours; }catch(e){}\n  if(type==='rename_card'){\n    extra = prompt('请输入新用户名：');\n    if(!extra) return;\n  }else if(type==='custom_title'){\n    extra = prompt('请输入自定义头衔（最多20字）：');\n    if(!extra) return;\n  }else if(type==='pin_card'){\n    // 拉取我的帖子列表来选\n    try{\n      const j = await api('/api/users/'+me.id);\n      if(!j.threads.length){ alert('你还没有发过帖子'); return; }\n      let html = '<h3>选择要置顶的帖子（'+_hours+'小时）</h3>';\n      j.threads.slice(0,10).forEach(t=>{\n        html += '<div class=\"thread\" style=\"margin:8px 0\" onclick=\"doPinCard('+id+','+t.id+','+_hours+')\"><div class=\"ti\">'+esc(t.title)+'</div><div class=\"mt\"><span>'+esc(t.board_name)+'</span></div></div>';\n      });\n      showModal(html);\n      return;\n    }catch(e){ alert('加载帖子失败'); return; }\n  }else if(type==='avatar_frame'){\n    if(!confirm('确定使用头像框吗？')) return;\n  }\n  try{\n    const body = {user_item_id:id};\n    if(extra) body.extra = extra;\n    if(thread_id) body.thread_id = thread_id;\n    const j = await api('/api/shop/use', {method:'POST', body:JSON.stringify(body)});\n    if(j.ok){ alert('使用成功！'); await refreshMe(); viewShop(); }\n  }catch(e){ alert(e.message); }\n}\nasync function doPinCard(itemId, threadId, hours){\n  hideModal();\n  if(!confirm('确定置顶这个帖子 '+(hours||24)+' 小时吗？')) return;\n  try{\n    const j = await api('/api/shop/use', {method:'POST', body:JSON.stringify({user_item_id:itemId, thread_id:threadId})});\n    if(j.ok){ alert('置顶成功！'); viewShop(); }\n  }catch(e){ alert(e.message); }\n}\nasync function transferPoints(uid, name){\n  const amount = prompt('转增积分给 '+name+'（单次最多 1000 分）：');\n  if(!amount) return;\n  const n = Math.floor(Number(amount));\n  if(!n || n < 1){ alert('请输入有效数量'); return; }\n  if(!confirm('确定转增 '+n+' 分给 '+name+' 吗？')) return;\n  try{\n    const j = await api('/api/points/transfer', {method:'POST', body:JSON.stringify({to_user_id:uid, amount:n})});\n    if(j.ok){ alert('转增成功！'); refreshMe(); }\n  }catch(e){ alert(e.message); }\n}\nfunction viewTools(){\n  setTitle('工具中心');\n  app.innerHTML = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 首页</div>'+adHtml('tools_top')+\n  '<div class=\"card\"><h2 class=\"tt\">🧰 工具中心</h2><div style=\"font-size:13px;color:var(--muted);margin-bottom:16px\">不用离开论坛，搞定 80% 日常操作</div>'+\n  '<div style=\"display:grid;gap:12px\">'+\n  '<div class=\"thread\" onclick=\"navigate(\\'/tools/quiz\\')\"><div class=\"ti\">🐧 Linux 段位测试 <span style=\"font-size:11px;color:#fff;background:#dc2626;border-radius:4px;padding:1px 6px;margin-left:4px\">火爆</span></div><div class=\"mt\"><span>50+ 题库随机抽 20 道，测测你是哪一级企鹅</span></div></div>'+\n  '<div class=\"thread\" onclick=\"navigate(\\'/tools/explain\\')\"><div class=\"ti\">💡 中文命令解释器 <span style=\"font-size:11px;color:#fff;background:var(--primary);border-radius:4px;padding:1px 6px;margin-left:4px\">推荐</span></div><div class=\"mt\"><span>粘贴命令，自动拆解每个参数的中文含义</span></div></div>'+\n  '<div class=\"thread\" onclick=\"navigate(\\'/tools/diff\\')\"><div class=\"ti\">📝 配置 Diff 对比器</div><div class=\"mt\"><span>上传两个配置文件，自动高亮差异</span></div></div>'+\n  '<div class=\"thread\" onclick=\"navigate(\\'/tools/distro\\')\"><div class=\"ti\">🐧 发行版推荐</div><div class=\"mt\"><span>输入硬件和使用场景，推荐最合适的发行版</span></div></div>'+\n  '<div class=\"thread\" onclick=\"navigate(\\'/tools/shellcheck\\')\"><div class=\"ti\">🔍 Shell 脚本体检器</div><div class=\"mt\"><span>检测语法错误、安全风险、性能问题</span></div></div>'+\n  '</div></div>';\n}\nfunction viewDiffTool(){\n  setTitle('配置 Diff 对比器');\n  trackTool('diff');\n  app.innerHTML = '<div class=\"crumb\" onclick=\"navigate(\\'/tools\\')\">‹ 工具中心</div>'+\n  '<div class=\"card\"><h2 class=\"tt\">📝 配置 Diff 对比器</h2>'+\n  '<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0\">'+\n  '<div><div style=\"font-size:13px;margin-bottom:4px\">文件 A（旧）</div><textarea id=\"diff-a\" style=\"min-height:200px;font-family:monospace;font-size:12px\" placeholder=\"粘贴旧配置…\"></textarea></div>'+\n  '<div><div style=\"font-size:13px;margin-bottom:4px\">文件 B（新）</div><textarea id=\"diff-b\" style=\"min-height:200px;font-family:monospace;font-size:12px\" placeholder=\"粘贴新配置…\"></textarea></div></div>'+\n  '<button class=\"btn\" onclick=\"doDiff()\">对比</button><div id=\"diff-out\" style=\"margin-top:12px\"></div></div>';\n}\nfunction doDiff(){\n  const a = document.getElementById('diff-a').value.split('\\n');\n  const b = document.getElementById('diff-b').value.split('\\n');\n  const maxLen = Math.max(a.length, b.length);\n  let html = '<div style=\"font-family:monospace;font-size:12px;line-height:1.6;background:var(--bg);border-radius:8px;padding:12px;overflow-x:auto\">';\n  let diffCount = 0;\n  for(let i=0; i<maxLen; i++){\n    const la = a[i] ?? '', lb = b[i] ?? '';\n    if(la === lb){\n      html += '<div style=\"color:var(--muted)\"> '+esc(la||'&nbsp;')+'</div>';\n    }else{\n      diffCount++;\n      if(la) html += '<div style=\"background:#3f1d1d;color:#f85149\">- '+esc(la)+'</div>';\n      if(lb) html += '<div style=\"background:#0d2818;color:#3fb950\">+ '+esc(lb)+'</div>';\n    }\n  }\n  html += '</div><div style=\"font-size:13px;color:var(--muted);margin-top:8px\">共 '+diffCount+' 处差异</div>';\n  document.getElementById('diff-out').innerHTML = html;\n}\nfunction viewDistroTool(){\n  setTitle('发行版推荐');\n  trackTool('distro');\n  app.innerHTML = '<div class=\"crumb\" onclick=\"navigate(\\'/tools\\')\">‹ 工具中心</div>'+\n  '<div class=\"card\"><h2 class=\"tt\">🐧 发行版推荐</h2>'+\n  '<div class=\"setrow\"><label>主要用途</label><select id=\"dt-use\"><option value=\"desktop\">日常办公/上网</option><option value=\"dev\">开发编程</option><option value=\"server\">服务器</option><option value=\"game\">游戏</option><option value=\"old\">老旧电脑复活</option></select></div>'+\n  '<div class=\"setrow\"><label>Linux 经验</label><select id=\"dt-exp\"><option value=\"new\">新手（第一次用）</option><option value=\"mid\">用过一段时间</option><option value=\"pro\">老手</option></select></div>'+\n  '<div class=\"setrow\"><label>偏好</label><select id=\"dt-like\"><option value=\"stable\">稳定优先</option><option value=\"new\">喜欢尝鲜</option><option value=\"custom\">爱折腾定制</option></select></div>'+\n  '<button class=\"btn\" onclick=\"doDistro()\">推荐</button><div id=\"distro-out\" style=\"margin-top:12px\"></div></div>';\n}\nfunction doDistro(){\n  const use = document.getElementById('dt-use').value;\n  const exp = document.getElementById('dt-exp').value;\n  const like = document.getElementById('dt-like').value;\n  let rec = '', de = '', reason = '';\n  if(use === 'server'){ rec = 'Ubuntu Server LTS / Debian'; de = '无桌面（命令行）'; reason = '服务器求稳，LTS 版本支持 5 年，文档最多'; }\n  else if(use === 'old'){ rec = 'Lubuntu / Xubuntu / antiX'; de = 'LXQt / Xfce'; reason = '轻量桌面，老机器也能流畅跑'; }\n  else if(use === 'game'){ rec = 'Pop!_OS / Nobara'; de = 'GNOME / KDE'; reason = '显卡驱动开箱即用，对 Steam/Proton 优化好'; }\n  else if(exp === 'new'){ rec = 'Linux Mint / Ubuntu LTS'; de = 'Cinnamon / GNOME'; reason = '新手最友好，开箱即用，中文社区资料多'; }\n  else if(like === 'custom'){ rec = 'Arch Linux'; de = 'i3 / Hyprland（自己搭）'; reason = '爱折腾就上 Arch，AUR 应有尽有，Wiki 是宝藏'; }\n  else if(like === 'new'){ rec = 'Fedora Workstation'; de = 'GNOME'; reason = '软件够新又不太折腾，适合想尝鲜的'; }\n  else { rec = 'Debian Stable'; de = 'Xfce / GNOME'; reason = '稳定如磐石，适合不爱折腾的'; }\n  document.getElementById('distro-out').innerHTML =\n    '<div style=\"background:var(--hl);border-radius:8px;padding:16px\">'+\n    '<div style=\"font-size:16px;font-weight:700;margin-bottom:8px\">推荐：'+esc(rec)+'</div>'+\n    '<div style=\"font-size:14px;margin-bottom:4px\">桌面环境：'+esc(de)+'</div>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">理由：'+esc(reason)+'</div></div>';\n}\nfunction viewShellcheckTool(){\n  setTitle('Shell 脚本体检器');\n  trackTool('shellcheck');\n  app.innerHTML = '<div class=\"crumb\" onclick=\"navigate(\\'/tools\\')\">‹ 工具中心</div>'+\n  '<div class=\"card\"><h2 class=\"tt\">🔍 Shell 脚本体检器</h2>'+\n  '<textarea id=\"sh-code\" style=\"min-height:200px;font-family:monospace;font-size:12px\" placeholder=\"粘贴 Shell 脚本…\"></textarea>'+\n  '<button class=\"btn\" onclick=\"doShellcheck()\" style=\"margin-top:8px\">体检</button><div id=\"sh-out\" style=\"margin-top:12px\"></div></div>';\n}\n\n/* ---------- 中文命令解释器 ---------- */\nfunction viewExplainTool(cmd){\n  setTitle('命令解释器');\n  trackTool('explain');\n  const initCmd = cmd || '';\n  app.innerHTML = '<div class=\"crumb\" onclick=\"navigate(\\'/tools\\')\">‹ 工具中心</div>'+\n  '<div class=\"card\"><h2 class=\"tt\">💡 中文命令解释器</h2>'+\n  '<div style=\"font-size:13px;color:var(--muted);margin-bottom:12px\">粘贴一条 Linux 命令，自动拆解每个参数的中文含义。支持 '+Object.keys(CMD_DB).length+' 个常用命令。</div>'+\n  '<div style=\"display:flex;gap:8px;margin-bottom:12px\"><input type=\"text\" id=\"exp-input\" placeholder=\"比如：tar -xzf pkg.tar.gz -C /opt\" value=\"'+esc(initCmd)+'\" style=\"font-family:monospace;margin:0;flex:1\" onkeydown=\"if(event.key===\\'Enter\\')doExplain()\"><button class=\"btn\" style=\"width:auto;white-space:nowrap\" onclick=\"doExplain()\">解释</button></div>'+\n  '<div style=\"font-size:12px;color:var(--muted);margin-bottom:12px\">试试：<span style=\"cursor:pointer;color:var(--primary)\" onclick=\"document.getElementById(\\'exp-input\\').value=\\'tar -xzf pkg.tar.gz -C /opt\\';doExplain()\">tar -xzf</span> · <span style=\"cursor:pointer;color:var(--primary)\" onclick=\"document.getElementById(\\'exp-input\\').value=\\'grep -rn error /var/log/\\';doExplain()\">grep -rn</span> · <span style=\"cursor:pointer;color:var(--primary)\" onclick=\"document.getElementById(\\'exp-input\\').value=\\'docker run -d -p 8080:80 --name web nginx\\';doExplain()\">docker run</span></div>'+\n  '<div id=\"exp-out\"></div></div>';\n  if(initCmd) doExplain();\n}\n\n/* ---------- Linux 段位测试 ---------- */\nlet quizState = null;\nfunction shuffleArr(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }\nfunction viewQuiz(){\n  setTitle('Linux 段位测试');\n  trackTool('quiz');\n  // 如果是分享链接（?score=），直接展示该成绩\n  const m = location.search.match(/score=(\\d+)/);\n  if(m){\n    const score = Math.max(0, Math.min(100, parseInt(m[1])));\n    showSharedQuizResult(score);\n    return;\n  }\n  // 随机抽 20 题，每题选项打乱\n  const pool = shuffleArr([...QUIZ_DB]);\n  const picked = pool.slice(0, 20).map(q=>{\n    const order = shuffleArr([0,1,2,3]);\n    return { q:q.q, why:q.why, opts:order.map(i=>q.opts[i]), a:order.indexOf(q.a) };\n  });\n  quizState = { idx: 0, score: 0, answers: [], questions: picked };\n  renderQuizQ();\n}\nfunction showSharedQuizResult(score){\n  const rank = quizRank(score);\n  const shareUrl = location.href;\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/tools\\')\">‹ 工具中心</div>'+\n  '<div class=\"card\" style=\"text-align:center;padding:32px 20px\">'+\n  '<div style=\"font-size:64px;margin-bottom:8px\">'+rank.emoji+'</div>'+\n  '<div style=\"font-size:13px;color:var(--muted)\">TA 的 Linux 段位是</div>'+\n  '<div style=\"font-size:32px;font-weight:800;color:var(--primary);margin:8px 0\">'+rank.title+'</div>'+\n  '<div style=\"font-size:14px;color:var(--muted);margin-bottom:16px;max-width:400px;margin-left:auto;margin-right:auto;line-height:1.6\">'+rank.desc+'</div>'+\n  '<div style=\"display:inline-block;background:var(--bg);border-radius:12px;padding:12px 24px;margin-bottom:8px\">'+\n  '<div style=\"font-size:36px;font-weight:800\">'+score+'<span style=\"font-size:16px;color:var(--muted)\"> 分</span></div></div>'+\n  '<div style=\"margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap\">'+\n  '<button class=\"btn\" style=\"width:auto;padding:10px 24px\" onclick=\"navigate(\\'/tools/quiz\\')\">我也测测</button>'+\n  '<button class=\"btn ghost\" style=\"width:auto;padding:10px 24px\" onclick=\"navigator.clipboard.writeText(\\''+shareUrl+'\\').then(()=>alert(\\'链接已复制\\'))\">复制链接</button>'+\n  '</div></div>';\n  app.innerHTML = html;\n}\nfunction renderQuizQ(){\n  const s = quizState, q = s.questions[s.idx];\n  const total = s.questions.length;\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/tools\\')\">‹ 工具中心</div>'+\n  '<div class=\"card\"><h2 class=\"tt\">🐧 Linux 段位测试</h2>'+\n  '<div style=\"font-size:13px;color:var(--muted);margin-bottom:12px\">第 '+(s.idx+1)+' / '+total+' 题 · 答对 +5 分</div>'+\n  '<div style=\"height:6px;background:var(--bg);border-radius:3px;margin-bottom:16px\"><div style=\"height:100%;width:'+Math.round(s.idx/total*100)+'%;background:var(--primary);border-radius:3px;transition:width .3s\"></div></div>'+\n  '<div style=\"font-size:16px;font-weight:700;margin-bottom:16px;line-height:1.6\">'+esc(q.q)+'</div>'+\n  '<div style=\"display:grid;gap:10px\">';\n  q.opts.forEach((o, i)=>{\n    html += '<div class=\"thread\" style=\"cursor:pointer\" onclick=\"quizAnswer('+i+')\"><div style=\"font-size:14px\"><span style=\"display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;background:var(--bg);border-radius:50%;margin-right:8px;font-size:12px\">'+String.fromCharCode(65+i)+'</span>'+esc(o)+'</div></div>';\n  });\n  html += '</div></div>';\n  app.innerHTML = html;\n  window.scrollTo(0, 0);\n}\nfunction quizAnswer(choice){\n  const s = quizState, q = s.questions[s.idx];\n  const correct = choice === q.a;\n  if(correct) s.score += 5;\n  s.answers.push({ choice, correct });\n  // 显示解析\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/tools\\')\">‹ 工具中心</div>'+\n  '<div class=\"card\"><h2 class=\"tt\">🐧 Linux 段位测试</h2>'+\n  '<div style=\"font-size:13px;color:var(--muted);margin-bottom:12px\">第 '+(s.idx+1)+' / '+s.questions.length+' 题</div>'+\n  '<div style=\"font-size:16px;font-weight:700;margin-bottom:16px\">'+esc(q.q)+'</div><div style=\"display:grid;gap:10px\">';\n  q.opts.forEach((o, i)=>{\n    let style = '', mark = '';\n    if(i === q.a){ style = 'border:2px solid #16a34a;background:var(--hl)'; mark = ' ✓'; }\n    else if(i === choice){ style = 'border:2px solid #dc2626'; mark = ' ✗'; }\n    html += '<div class=\"thread\" style=\"'+style+'\"><div style=\"font-size:14px\">'+esc(o)+mark+'</div></div>';\n  });\n  html += '</div>'+\n  '<div style=\"margin-top:16px;padding:12px;background:var(--bg);border-radius:8px;font-size:14px;line-height:1.6\">'+(correct?'✅ 答对了！+5 分':'❌ 答错了')+'<br><span style=\"color:var(--muted)\">'+esc(q.why)+'</span></div>';\n  if(s.idx < s.questions.length - 1){\n    html += '<button class=\"btn\" style=\"margin-top:16px\" onclick=\"quizNext()\">下一题 →</button>';\n  }else{\n    html += '<button class=\"btn\" style=\"margin-top:16px\" onclick=\"quizResult()\">查看我的段位 →</button>';\n  }\n  html += '</div>';\n  app.innerHTML = html;\n  window.scrollTo(0, 0);\n}\nfunction quizNext(){\n  quizState.idx++;\n  renderQuizQ();\n}\nfunction quizResult(){\n  const s = quizState;\n  const rank = quizRank(s.score);\n  const correctCount = s.answers.filter(a=>a.correct).length;\n  const shareUrl = location.origin + '/tools/quiz?score=' + s.score;\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/tools\\')\">‹ 工具中心</div>'+\n  '<div class=\"card\" style=\"text-align:center;padding:32px 20px\">'+\n  '<div style=\"font-size:64px;margin-bottom:8px\">'+rank.emoji+'</div>'+\n  '<div style=\"font-size:13px;color:var(--muted)\">你的 Linux 段位是</div>'+\n  '<div style=\"font-size:32px;font-weight:800;color:var(--primary);margin:8px 0\">'+rank.title+'</div>'+\n  '<div style=\"font-size:14px;color:var(--muted);margin-bottom:16px;max-width:400px;margin-left:auto;margin-right:auto;line-height:1.6\">'+rank.desc+'</div>'+\n  '<div style=\"display:inline-block;background:var(--bg);border-radius:12px;padding:12px 24px;margin-bottom:8px\">'+\n  '<div style=\"font-size:36px;font-weight:800\">'+s.score+'<span style=\"font-size:16px;color:var(--muted)\"> 分</span></div>'+\n  '<div style=\"font-size:12px;color:var(--muted)\">答对 '+correctCount+' / '+s.questions.length+' 题</div></div>'+\n  '<div style=\"margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap\">'+\n  '<button class=\"btn\" style=\"width:auto;padding:10px 24px\" onclick=\"viewQuiz()\">再测一次</button>'+\n  '<button class=\"btn\" style=\"width:auto;padding:10px 24px;background:var(--bg);color:var(--text);border:1px solid var(--border)\" onclick=\"navigator.clipboard.writeText(\\''+shareUrl+'\\');alert(\\'分享链接已复制，快去炫耀你的段位吧！\\')\">📤 分享我的段位</button>'+\n  '</div>'+\n  '<div style=\"margin-top:16px;font-size:13px;color:var(--muted)\">🔗 <span style=\"cursor:pointer;color:var(--primary);word-break:break-all\" onclick=\"navigator.clipboard.writeText(\\''+shareUrl+'\\');alert(\\'链接已复制\\')\">'+shareUrl+'</span></div>'+\n  '<div id=\"quiz-claim\" style=\"margin-top:16px\"></div>'+\n  '<div style=\"margin-top:16px;padding-top:16px;border-top:1px solid var(--border);font-size:14px\">🐧 想和同段位的人交流？<br><span style=\"cursor:pointer;color:var(--primary);font-weight:700\" onclick=\"navigate(\\'/register\\')\">梦鱼资源 →</span></div>'+\n  '</div>';\n  app.innerHTML = html;\n  window.scrollTo(0, 0);\n  history.replaceState({}, '', '/tools/quiz?score=' + s.score);\n  // 记录测试完成\n  trackTool('quiz_done');\n  // 积分领取：登录用户自动领，未登录引导注册\n  const claimBox = document.getElementById('quiz-claim');\n  if(typeof me !== 'undefined' && me){\n    api('/api/quiz/claim', { method:'POST', body: JSON.stringify({ score: s.score }) }).then(j=>{\n      if(j.ok && !j.already) claimBox.innerHTML = '<div style=\"background:var(--hl);border-radius:8px;padding:12px;font-size:14px\">🎉 首次完成测试，<b>+' + j.points + ' 积分</b>已到账！</div>';\n      else if(j.ok && j.already) claimBox.innerHTML = '<div style=\"font-size:13px;color:var(--muted)\">已领取过测试积分（最高分 ' + s.score + ' 分）</div>';\n    }).catch(()=>{});\n  }else{\n    claimBox.innerHTML = '<div style=\"background:var(--hl);border-radius:8px;padding:12px;font-size:14px;cursor:pointer\" onclick=\"navigate(\\'/login\\')\">🔑 <b>登录领取积分</b>：首次完成测试可得 5–15 积分 →</div>';\n  }\n}\nfunction parseCommand(input){\n  // 简单分词：处理引号\n  const tokens = [];\n  let cur = '', inQuote = null;\n  for(let i=0; i<input.length; i++){\n    const c = input[i];\n    if(inQuote){\n      if(c === inQuote){ inQuote = null; }\n      else cur += c;\n    }else if(c === '\"' || c === \"'\"){ inQuote = c; }\n    else if(c === ' ' || c === '\\t'){ if(cur){ tokens.push(cur); cur=''; } }\n    else cur += c;\n  }\n  if(cur) tokens.push(cur);\n  return tokens;\n}\nfunction doExplain(){\n  const input = document.getElementById('exp-input').value.trim();\n  const out = document.getElementById('exp-out');\n  if(!input){ out.innerHTML = '<div class=\"hint\">请输入一条命令</div>'; return; }\n  const tokens = parseCommand(input);\n  if(!tokens.length){ out.innerHTML = '<div class=\"hint\">无法解析</div>'; return; }\n  const cmd = tokens[0];\n  const info = CMD_DB[cmd];\n  let html = '';\n  // 命令头\n  html += '<div style=\"background:var(--bg);border-radius:8px;padding:12px;margin-bottom:12px;font-family:monospace;font-size:14px;word-break:break-all\">';\n  html += '<span style=\"color:var(--primary);font-weight:700\">'+esc(cmd)+'</span>';\n  tokens.slice(1).forEach(t=>{\n    const isFlag = t.startsWith('-');\n    html += ' <span style=\"color:'+(isFlag?'#d97706':'var(--text)')+'\">'+esc(t)+'</span>';\n  });\n  html += '</div>';\n  if(!info){\n    html += '<div class=\"hint\">😅 暂未收录 \"'+esc(cmd)+'\" 的详解<br><span style=\"font-size:12px\">已收录 '+Object.keys(CMD_DB).length+' 个常用命令，更多命令持续补充中</span></div>';\n  }else{\n    html += '<div style=\"font-size:15px;font-weight:700;margin-bottom:8px\">'+esc(info.desc)+'</div>';\n    if(info.tips) html += '<div style=\"font-size:13px;background:var(--hl);border-radius:8px;padding:10px 12px;margin-bottom:12px\">💡 '+esc(info.tips)+'</div>';\n    // 逐个解释参数\n    const args = tokens.slice(1);\n    if(args.length){\n      html += '<div style=\"font-size:14px;font-weight:700;margin:12px 0 8px\">参数详解：</div>';\n      let i = 0;\n      const explained = new Set();\n      while(i < args.length){\n        const t = args[i];\n        let desc = null, extra = null;\n        if(info.flags[t]){\n          desc = info.flags[t];\n        }else if(t.startsWith('--')){\n          // 长参数：尝试匹配 --key=value\n          const eq = t.indexOf('=');\n          const key = eq > 0 ? t.slice(0, eq) : t;\n          desc = info.flags[key] || null;\n          if(desc && eq > 0) extra = t.slice(eq+1);\n        }else if(t.startsWith('-') && t.length > 2 && !t.startsWith('--')){\n          // 合并短参数：如 -xzf 拆成 -x -z -f\n          const parts = [];\n          for(const ch of t.slice(1)){\n            const f = '-'+ch;\n            if(info.flags[f]) parts.push(f);\n          }\n          if(parts.length){\n            desc = parts.map(p=>'<code style=\"background:var(--bg);padding:1px 6px;border-radius:4px\">'+esc(p)+'</code> '+esc(info.flags[p])).join('<br>');\n          }\n        }\n        // 下一个 token 可能是参数的值\n        let val = null;\n        if(desc && i+1 < args.length && !args[i+1].startsWith('-') && !explained.has(args[i+1])){\n          // 启发式：如果当前 flag 描述里暗示需要值，则吃掉下一个\n          val = args[i+1];\n        }\n        if(desc){\n          html += '<div style=\"border-left:3px solid var(--primary);padding:8px 12px;margin-bottom:8px;background:var(--bg);border-radius:0 8px 8px 0\">';\n          html += '<div style=\"font-family:monospace;font-weight:700;color:#d97706\">'+esc(t)+(val?' <span style=\"color:var(--muted);font-weight:400\">'+esc(val)+'</span>':'')+'</div>';\n          html += '<div style=\"font-size:13px;margin-top:4px\">'+desc+'</div>';\n          if(extra) html += '<div style=\"font-size:12px;color:var(--muted)\">值：'+esc(extra)+'</div>';\n          html += '</div>';\n          if(val){ explained.add(val); i++; }\n        }else if(!explained.has(t)){\n          // 未知参数或普通参数\n          const isFlag = t.startsWith('-');\n          html += '<div style=\"border-left:3px solid var(--border);padding:8px 12px;margin-bottom:8px;border-radius:0 8px 8px 0\">';\n          html += '<div style=\"font-family:monospace;font-weight:700\">'+esc(t)+'</div>';\n          html += '<div style=\"font-size:13px;color:var(--muted)\">'+(isFlag?'未收录该参数，可能是命令特有参数':'命令的操作对象（文件/目录/值）')+'</div></div>';\n        }\n        i++;\n      }\n    }\n    if(info.extra) html += '<div style=\"font-size:13px;background:var(--bg);border-radius:8px;padding:10px 12px;margin-top:12px\">📚 '+esc(info.extra)+'</div>';\n    if(info.example) html += '<div style=\"font-size:13px;margin-top:12px\"><span style=\"color:var(--muted)\">示例：</span><code style=\"background:var(--bg);padding:4px 8px;border-radius:4px;font-family:monospace\">'+esc(info.example)+'</code> <span style=\"cursor:pointer;color:var(--primary);font-size:12px\" onclick=\"navigator.clipboard.writeText(\\''+info.example.replace(/'/g,\"\\\\'\")+'\\');alert(\\'已复制\\')\">复制</span></div>';\n  }\n  // 分享链接\n  const shareUrl = location.origin + '/tools/explain?cmd=' + encodeURIComponent(input);\n  html += '<div style=\"margin-top:16px;padding-top:12px;border-top:1px solid var(--border);font-size:13px;color:var(--muted)\">🔗 分享这条解释：<span style=\"cursor:pointer;color:var(--primary);word-break:break-all\" onclick=\"navigator.clipboard.writeText(\\''+shareUrl+'\\');alert(\\'链接已复制\\')\">'+esc(shareUrl)+'</span></div>';\n  out.innerHTML = html;\n  // 更新 URL（不刷新）\n  history.replaceState({}, '', '/tools/explain?cmd=' + encodeURIComponent(input));\n}\nfunction doShellcheck(){\n  const code = document.getElementById('sh-code').value;\n  const issues = [];\n  const lines = code.split('\\n');\n  lines.forEach((ln, idx)=>{\n    const n = idx + 1;\n    if(/rm\\s+-rf?\\s+\\/$/.test(ln) || /rm\\s+-rf?\\s+\\/\\*/.test(ln)) issues.push([n, 'danger', '检测到 rm -rf / 或 /*，极度危险！请三思']);\n    else if(/rm\\s+-rf?\\s+\\$[A-Za-z_]+[^}]*$/.test(ln) && !/\\$\\{[A-Za-z_]+:?[+-]/.test(ln)) issues.push([n, 'warn', 'rm -rf 接未判空变量，变量为空时会删根目录，建议用 ${VAR:?}']);\n    if(/[^\\\\]?\\$\\w+[^\"\\s]*\\//.test(ln) && /cp|mv|rm/.test(ln)) issues.push([n, 'warn', '变量未加引号，路径含空格会出错，建议 \"$VAR\"']);\n    if(/==/.test(ln) && /\\[ /.test(ln)) issues.push([n, 'warn', '[ ] 里用 = 不用 ==，== 是 [[ ]] 的写法']);\n    if(/`[^`]*`/.test(ln)) issues.push([n, 'info', '建议用 $(...) 代替反引号，可读性更好']);\n    if(/echo\\s+\\$/.test(ln) && !/echo\\s+\"\\$/.test(ln)) issues.push([n, 'info', 'echo 变量建议加引号']);\n    if(/for\\s+\\w+\\s+in\\s+\\$\\(ls/.test(ln)) issues.push([n, 'warn', '不要 for i in $(ls)，用 for i in * 或 glob']);\n    if(/^\\s*cd\\s/.test(ln) && !/||/.test(ln)) issues.push([n, 'warn', 'cd 失败不检查，后续命令会在错误目录执行，建议 cd dir || exit']);\n  });\n  if(!code.trim()){ document.getElementById('sh-out').innerHTML = '<div class=\"hint\">请先粘贴脚本</div>'; return; }\n  const colors = {danger:'#f85149', warn:'#d97706', info:'var(--primary)'};\n  const labels = {danger:'⛔ 危险', warn:'⚠️ 警告', info:'💡 建议'};\n  let html = '';\n  if(!issues.length) html = '<div style=\"background:var(--hl);border-radius:8px;padding:16px;color:var(--primary);font-weight:700\">✓ 没发现明显问题，脚本看起来不错！</div>';\n  else{\n    html = '<div style=\"font-size:13px;color:var(--muted);margin-bottom:8px\">发现 '+issues.length+' 个问题：</div>';\n    issues.forEach(([n, lv, msg])=>{\n      html += '<div style=\"border-left:3px solid '+colors[lv]+';padding:8px 12px;margin-bottom:8px;background:var(--bg);border-radius:0 8px 8px 0\">'+\n        '<div style=\"font-size:12px;color:'+colors[lv]+';font-weight:700\">'+labels[lv]+' · 第 '+n+' 行</div>'+\n        '<div style=\"font-size:13px\">'+esc(msg)+'</div></div>';\n    });\n  }\n  document.getElementById('sh-out').innerHTML = html;\n}\n\n/* ---------- 私信 ---------- */\nasync function viewDmList(){\n  if(!me){ showLogin(); return; }\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  setTitle('私信');\n  try{\n    const j = await api('/api/dm');\n    let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 首页</div>';\n    html += '<div class=\"card\"><h2 class=\"tt\">私信</h2>';\n    if(!j.conversations.length) html += '<div class=\"hint\">还没有私信，去用户主页发一条吧</div>';\n    j.conversations.forEach(c=>{\n      html += '<div class=\"urow\" onclick=\"navigate(\\'/dm/'+c.uid+'\\'\" style=\"cursor:pointer\">'+\n        avatarHtml(c.user.avatar_url, c.user.name)+\n        '<div class=\"info\"><div class=\"nm\">'+esc(c.user.name)+(c.unread?'<span class=\"tag ban\">'+c.unread+' 未读</span>':'')+'</div>'+\n        '<div class=\"em\">'+esc((c.last_msg||'').slice(0,40))+'</div></div>'+\n        '<div class=\"em\">'+timeAgo(c.last_at)+'</div></div>';\n    });\n    html += '</div>';\n    app.innerHTML = html;\n  }catch(e){\n    app.innerHTML = '<div class=\"hint\">加载失败：'+esc(e.message)+' <a href=\"javascript:route()\">重试</a></div>';\n  }\n  loadDmCount();\n}\nasync function viewDmChat(uid){\n  if(!me){ showLogin(); return; }\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  let j;\n  try{ j = await api('/api/dm/'+uid); }\n  catch(e){ app.innerHTML = '<div class=\"hint\">'+esc(e.message)+'</div>'; return; }\n  setTitle('与 '+j.user.name+' 的私信');\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/dm\\')\">‹ 私信列表</div>';\n  html += '<div class=\"card\"><div style=\"display:flex;align-items:center;gap:10px;margin-bottom:12px\">'+\n    avatarHtml(j.user.avatar_url, j.user.name)+\n    '<b style=\"cursor:pointer\" onclick=\"navigate(\\'/u/'+j.user.id+'\\')\">'+esc(j.user.name)+'</b></div>'+\n    '<div id=\"dm-msgs\" style=\"max-height:50vh;overflow-y:auto;margin-bottom:12px\">';\n  if(!j.messages.length) html += '<div class=\"hint\">还没有消息，打个招呼吧</div>';\n  j.messages.forEach(m=>{\n    const mine = m.sender_id === me.id;\n    html += '<div style=\"display:flex;justify-content:'+(mine?'flex-end':'flex-start')+';margin-bottom:8px\">'+\n      '<div style=\"max-width:75%;background:'+(mine?'var(--primary);color:#fff':'var(--bg)')+';border-radius:12px;padding:8px 12px;font-size:14px;white-space:pre-wrap;word-break:break-word\">'+\n      renderContent(m.content)+'<div style=\"font-size:11px;opacity:.7;margin-top:4px\">'+timeAgo(m.created_at)+'</div></div></div>';\n  });\n  html += '</div>'+\n    '<div class=\"searchbar\"><input type=\"text\" id=\"dm-input\" placeholder=\"输入私信…\" onkeydown=\"if(event.key===\\'Enter\\')sendDm('+uid+')\">'+\n    '<button class=\"btn\" onclick=\"sendDm('+uid+')\">发送</button></div></div>';\n  app.innerHTML = html;\n  const box = document.getElementById('dm-msgs');\n  box.scrollTop = box.scrollHeight;\n  loadDmCount();\n}\nasync function sendDm(uid){\n  const input = document.getElementById('dm-input');\n  const content = input.value.trim();\n  if(!content) return;\n  try{\n    await api('/api/dm/'+uid, {method:'POST', body:JSON.stringify({content})});\n    viewDmChat(uid);\n  }catch(e){ alert(e.message); }\n}\n\n/* ---------- 管理后台 ---------- */\nlet adminTab = 'stats';\nasync function viewAdmin(tab){\n  setTitle('管理后台');\n  if(!me || !me.is_admin){ app.innerHTML = '<div class=\"hint\">需要管理员权限</div>'; return; }\n  adminTab = tab;\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  const tabs = '<div class=\"tabs\"><button class=\"'+(tab==='stats'?'on':'')+'\" onclick=\"navigate(\\'/admin\\')\">📊 概览</button>'+\n    '<button class=\"'+(tab==='users'?'on':'')+'\" onclick=\"navigate(\\'/admin/users\\')\">👥 用户</button>'+\n    '<button class=\"'+(tab==='boards'?'on':'')+'\" onclick=\"navigate(\\'/admin/boards\\')\">📋 版块</button>'+\n    '<button class=\"'+(tab==='reports'?'on':'')+'\" onclick=\"navigate(\\'/admin/reports\\')\">🚨 举报'+(tab==='reports'?'':'<span id=\"rep-dot\"></span>')+'</button>'+\n    '<button class=\"'+(tab==='words'?'on':'')+'\" onclick=\"navigate(\\'/admin/words\\')\">🔞 敏感词</button>'+\n    '<button class=\"'+(tab==='ads'?'on':'')+'\" onclick=\"navigate(\\'/admin/ads\\')\">📢 广告</button>'+\n    '<button class=\"'+(tab==='links'?'on':'')+'\" onclick=\"navigate(\\'/admin/links\\')\">🔗 友链</button>'+\n    '<button class=\"'+(tab==='shop'?'on':'')+'\" onclick=\"navigate(\\'/admin/shop\\')\">🛒 商品</button>'+\n    '<button class=\"'+(tab==='site'?'on':'')+'\" onclick=\"navigate(\\'/admin/site\\')\">⚙️ 站点</button>'+\n    '<button class=\"'+(tab==='logs'?'on':'')+'\" onclick=\"navigate(\\'/admin/logs\\')\">📝 日志</button></div>';\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 全部版块</div><h2 class=\"tt\" style=\"margin-bottom:12px\">管理后台</h2>' + tabs;\n  try{\n    if(tab === 'stats'){\n      const j = await api('/api/admin/dashboard');\n      html += '<div class=\"stat-grid\">'+\n        '<div class=\"stat\"><div class=\"n\">'+j.todayUsers+'</div><div class=\"l\">今日新增用户</div></div>'+\n        '<div class=\"stat\"><div class=\"n\">'+j.todayThreads+'</div><div class=\"l\">今日新增主题</div></div>'+\n        '<div class=\"stat\"><div class=\"n\">'+j.todayPosts+'</div><div class=\"l\">今日新增回帖</div></div>'+\n        '<div class=\"stat\"><div class=\"n\">'+j.todayCheckins+'</div><div class=\"l\">今日签到</div></div></div>';\n      html += '<div class=\"card\" style=\"margin-top:12px\"><h3 style=\"font-size:15px;margin-bottom:12px\">📊 7 天趋势</h3>';\n      html += '<div style=\"overflow-x:auto\"><table style=\"width:100%;font-size:13px;border-collapse:collapse\"><tr style=\"color:var(--muted);text-align:left;border-bottom:1px solid var(--border)\"><th style=\"padding:8px\">日期</th><th>新用户</th><th>新主题</th><th>新回帖</th></tr>';\n      j.trend.forEach(t=>{\n        html += '<tr style=\"border-bottom:1px solid var(--border)\"><td style=\"padding:8px\">'+t.date+'</td><td>'+t.users+'</td><td>'+t.threads+'</td><td>'+t.posts+'</td></tr>';\n      });\n      html += '</table></div></div>';\n      if(j.toolVisits && j.toolVisits.length){\n        html += '<div class=\"card\" style=\"margin-top:12px\"><h3 style=\"font-size:15px;margin-bottom:12px\">🧰 工具访问（7天）</h3>';\n        j.toolVisits.forEach(t=>{\n          const names = {diff:'配置 Diff', distro:'发行版推荐', shellcheck:'Shell 体检'};\n          html += '<div style=\"display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:14px\"><span>'+(names[t.tool]||t.tool)+'</span><b>'+t.n+' 次</b></div>';\n        });\n        html += '</div>';\n      }\n      if(j.topUsers && j.topUsers.length){\n        html += '<div class=\"card\" style=\"margin-top:12px\"><h3 style=\"font-size:15px;margin-bottom:12px\">⭐ 积分排行 Top 10</h3>';\n        j.topUsers.forEach((u,i)=>{\n          html += '<div style=\"display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:14px;cursor:pointer\" onclick=\"navigate(\\'/u/'+u.id+'\\')\"><span>'+(i+1)+'. '+esc(u.name)+'</span><b style=\"color:var(--primary)\">'+u.points+' 分</b></div>';\n        });\n        html += '</div>';\n      }\n    }else if(tab === 'users'){\n      const j = await api('/api/admin/users');\n      html += '<div class=\"card\"><div style=\"display:flex;gap:8px;margin-bottom:12px\">'+\n        '<input id=\"u-search\" placeholder=\"搜索用户名/邮箱…\" style=\"flex:1;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text);font-size:14px\" oninput=\"filterUsers()\">'+\n        '</div><div id=\"u-list\">';\n      j.users.forEach(u=>{\n        let tags = '';\n        if(u.is_admin) tags += '<span class=\"tag adm\">管理</span>';\n        if(u.banned) tags += '<span class=\"tag ban\">禁言</span>';\n        if(!u.verified) tags += '<span class=\"tag nv\">未验证</span>';\n        html += '<div class=\"urow\" data-search=\"'+esc((u.name+' '+(u.email||'')).toLowerCase())+'\">'+avatarHtml(u.avatar_url, u.name)+\n          '<div class=\"info\"><div class=\"nm\">'+esc(u.name)+tags+'</div>'+\n          '<div class=\"em\">'+esc(u.email||'')+' · '+u.thread_count+' 主题 / '+u.post_count+' 回帖</div></div>'+\n          '<div class=\"abtns\">'+\n          '<button onclick=\"adminBan('+u.id+','+(u.banned?0:1)+')\">'+(u.banned?'解禁':'禁言')+'</button>'+\n          '<button onclick=\"adminRole('+u.id+','+(u.is_admin?0:1)+')\">'+(u.is_admin?'撤管理':'设管理')+'</button>'+\n          '<button onclick=\"adminPoints('+u.id+',\\''+esc(u.name).replace(/'/g,\"\\\\'\")+'\\','+(u.points||0)+')\">调积分</button>'+\n          '<button class=\"danger\" onclick=\"adminDelUser('+u.id+',\\''+esc(u.name).replace(/'/g,\"\\\\'\")+'\\')\">删除</button>'+\n          '</div></div>';\n      });\n      html += '</div></div>';\n    }else if(tab === 'boards'){\n      const j = await api('/api/boards');\n      html += '<div class=\"card\">';\n      j.boards.forEach(b=>{\n        html += '<div class=\"urow\"><div class=\"info\"><div class=\"nm\">'+esc(b.name)+'</div>'+\n          '<div class=\"em\">'+esc(b.descr||'')+' · '+b.thread_count+' 主题 · 排序 '+b.sort+'</div></div>'+\n          '<div class=\"abtns\"><button onclick=\"adminEditBoard('+b.id+',\\''+esc(b.name).replace(/'/g,\"\\\\'\")+'\\',\\''+esc(b.descr||'').replace(/'/g,\"\\\\'\")+'\\','+b.sort+')\">编辑</button>'+\n          '<button class=\"danger\" onclick=\"adminDelBoard('+b.id+')\">删除</button></div></div>';\n      });\n      html += '</div><div class=\"toolbar\"><button class=\"btn\" onclick=\"showAddBoard()\">＋ 新建版块</button></div>';\n    }else if(tab === 'reports'){\n      const j = await api('/api/admin/reports');\n      html += '<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px\">待处理举报（'+j.pendingCount+'）</h2>';\n      if(!j.reports.length) html += '<div class=\"hint\">没有待处理的举报</div>';\n      j.reports.forEach(r=>{\n        html += '<div class=\"urow\"><div class=\"info\"><div class=\"nm\">'+esc(r.reporter_name)+' 举报了'+(r.target_type==='thread'?'主题':'回帖')+'</div>'+\n          '<div class=\"em\">「'+esc(r.thread_title)+'」· 理由：'+esc(r.reason)+'</div>'+\n          '<div class=\"em\">'+timeAgo(r.created_at)+'</div></div>'+\n          '<div class=\"abtns\"><button onclick=\"navigate(\\'/t/'+r.thread_id+'\\')\">查看</button>'+\n          '<button onclick=\"handleReport('+r.id+',\\'dismiss\\')\">驳回</button>'+\n          '<button class=\"danger\" onclick=\"handleReport('+r.id+',\\'delete\\')\">删除内容</button></div></div>';\n      });\n      html += '</div>';\n    }else if(tab === 'words'){\n      const j = await api('/api/admin/sensitive-words');\n      html += '<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px\">敏感词过滤</h2>'+\n        '<div style=\"font-size:13px;color:var(--muted);margin-bottom:10px\">发帖、回帖、简介中包含这些词会被拦截</div>'+\n        '<div class=\"searchbar\"><input type=\"text\" id=\"w-word\" placeholder=\"输入敏感词…\"><button class=\"btn\" onclick=\"addWord()\">添加</button></div>'+\n        '<div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-top:10px\">';\n      j.words.forEach(w=>{\n        html += '<span style=\"background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:4px 12px;font-size:13px\">'+esc(w)+\n          ' <span style=\"cursor:pointer;color:var(--danger)\" onclick=\"delWord(\\''+esc(w).replace(/'/g,\"\\\\'\")+'\\')\">×</span></span>';\n      });\n      html += '</div></div>';\n    }else if(tab === 'logs'){\n      const page = 1;\n      const j = await api('/api/admin/logs?p='+page);\n      html += '<div class=\"card\"><table style=\"width:100%;font-size:13px;border-collapse:collapse\"><tr style=\"color:var(--muted);text-align:left;border-bottom:1px solid var(--border)\"><th style=\"padding:8px\">时间</th><th>管理员</th><th>操作</th><th>对象</th><th>备注</th></tr>';\n      j.logs.forEach(l=>{\n        html += '<tr style=\"border-bottom:1px solid var(--border)\"><td style=\"padding:8px;white-space:nowrap\">'+timeAgo(l.created_at)+'</td><td>'+esc(l.admin_name)+'</td><td>'+esc(l.action)+'</td><td>'+esc((l.target_type||'')+(l.target_id?'#'+l.target_id:''))+'</td><td style=\"color:var(--muted)\">'+esc(l.detail||'')+'</td></tr>';\n      });\n      html += '</table>';\n      if(!j.logs.length) html += '<div class=\"hint\">暂无操作记录</div>';\n      html += '</div>';\n    }else if(tab === 'ads'){\n      const j = await api('/api/admin/ads');\n      const positions = {'home_sidebar_top':'首页侧边栏顶部','home_sidebar_bottom':'首页侧边栏底部','thread_list':'帖子列表间','thread_top':'帖子页顶部','thread_bottom':'帖子页底部','footer_banner':'页脚横幅','tools_top':'工具页顶部'};\n      html += '<div class=\"card\"><h3 style=\"margin-bottom:12px\">添加广告</h3>'+\n        '<div class=\"setrow\"><label>标题</label><input type=\"text\" id=\"ad-title\" placeholder=\"广告标题\"></div>'+\n        '<div class=\"setrow\"><label>链接</label><input type=\"text\" id=\"ad-url\" placeholder=\"https://...\"></div>'+\n        '<div class=\"setrow\"><label>图片URL（选填）</label><input type=\"text\" id=\"ad-img\" placeholder=\"https://... 留空显示文字链\"></div>'+\n        '<div class=\"setrow\"><label>位置</label><select id=\"ad-pos\">'+Object.entries(positions).map(([k,v])=>'<option value=\"'+k+'\">'+v+'</option>').join('')+'</select></div>'+\n        '<button class=\"btn\" onclick=\"adminAddAd()\">添加</button></div>';\n      html += '<div class=\"card\">';\n      j.ads.forEach(a=>{\n        html += '<div class=\"urow\"><div class=\"info\"><div class=\"nm\">'+esc(a.title)+\n          ' <span style=\"font-size:11px;color:var(--muted)\">'+(positions[a.position]||a.position)+' · '+a.clicks+' 点击</span>'+\n          (a.enabled?'':' <span class=\"tag ban\">已禁用</span>')+'</div>'+\n          '<div class=\"em\">'+esc(a.url)+'</div></div><div class=\"abtns\">'+\n          '<button onclick=\"adminToggleAd('+a.id+','+(a.enabled?0:1)+')\">'+(a.enabled?'禁用':'启用')+'</button>'+\n          '<button class=\"danger\" onclick=\"adminDelAd('+a.id+')\">删除</button></div></div>';\n      });\n      if(!j.ads.length) html += '<div class=\"hint\">暂无广告</div>';\n      html += '</div>';\n    }else if(tab === 'links'){\n      const j = await api('/api/admin/friend-links');\n      html += '<div class=\"card\"><h3 style=\"margin-bottom:12px\">添加友链</h3>'+\n        '<div class=\"setrow\"><label>站名</label><input type=\"text\" id=\"lk-name\" placeholder=\"站名\"></div>'+\n        '<div class=\"setrow\"><label>链接</label><input type=\"text\" id=\"lk-url\" placeholder=\"https://...\"></div>'+\n        '<div class=\"setrow\"><label>简介</label><input type=\"text\" id=\"lk-descr\" placeholder=\"一句话简介\"></div>'+\n        '<button class=\"btn\" onclick=\"adminAddLink()\">添加</button></div>';\n      html += '<div class=\"card\">';\n      j.links.forEach(l=>{\n        html += '<div class=\"urow\"><div class=\"info\"><div class=\"nm\">'+esc(l.name)+'</div>'+\n          '<div class=\"em\">'+esc(l.url)+(l.descr?' · '+esc(l.descr):'')+'</div></div><div class=\"abtns\">'+\n          '<button class=\"danger\" onclick=\"adminDelLink('+l.id+')\">删除</button></div></div>';\n      });\n      if(!j.links.length) html += '<div class=\"hint\">暂无友链</div>';\n      html += '</div>';\n    }else if(tab === 'shop'){\n      const j = await api('/api/admin/shop/items');\n      window._shopItems = j.items;\n      const typeName = {pin_card:'📌 置顶卡', rename_card:'✏️ 改名卡', avatar_frame:'🖼️ 头像框', custom_title:'👑 自定义头衔', card:'🎟️ 卡密'};\n      html += '<div class=\"card\"><h3 style=\"margin-bottom:12px\" id=\"si-form-title\">上架商品</h3>'+\n        '<div class=\"setrow\"><label>名称</label><input type=\"text\" id=\"si-name\" placeholder=\"如：置顶卡\"></div>'+\n        '<div class=\"setrow\"><label>图标</label><input type=\"text\" id=\"si-icon\" placeholder=\"📌\" style=\"width:80px\"></div>'+\n        '<div class=\"setrow\"><label>价格（积分）</label><input type=\"number\" id=\"si-price\" placeholder=\"100\" style=\"width:120px\"></div>'+\n        '<div class=\"setrow\"><label>类型</label><select id=\"si-type\" onchange=\"shopTypeChange()\">'+\n          '<option value=\"pin_card\">📌 置顶卡</option><option value=\"rename_card\">✏️ 改名卡（30天限1次）</option>'+\n          '<option value=\"avatar_frame\">🖼️ 头像框</option><option value=\"custom_title\">👑 自定义头衔</option>'+\n          '<option value=\"card\">🎟️ 卡密（兑换码）</option></select></div>'+\n        '<div class=\"setrow\" id=\"si-duration-row\"><label>置顶时长（小时）</label><input type=\"number\" id=\"si-duration\" value=\"24\" style=\"width:100px\" placeholder=\"24\"></div>'+\n        '<div class=\"setrow\" id=\"si-codes-row\" style=\"display:none\"><label>兑换码（每行一个）</label><textarea id=\"si-codes\" style=\"min-height:80px\" placeholder=\"CODE001&#10;CODE002&#10;每行一个兑换码\"></textarea></div>'+\n        '<div class=\"setrow\"><label>简介（列表页显示）</label><input type=\"text\" id=\"si-descr\" placeholder=\"一句话描述，显示在商品列表\"></div>'+\n        '<div class=\"setrow\"><label>使用说明（详情页显示）</label><textarea id=\"si-usage\" style=\"min-height:60px\" placeholder=\"详细说明这个商品是干嘛的、怎么用，支持换行\"></textarea></div>'+\n        '<div class=\"setrow\"><label>排序</label><input type=\"number\" id=\"si-sort\" value=\"99\" style=\"width:80px\"></div>'+\n        '<div style=\"display:flex;gap:8px\"><button class=\"btn\" id=\"si-submit\" onclick=\"adminAddShopItem()\">上架</button>'+\n        '<button class=\"btn ghost\" id=\"si-cancel\" style=\"display:none\" onclick=\"adminCancelEditShop()\">取消</button></div></div>';\n      html += '<div class=\"card\">';\n      j.items.forEach(it=>{\n        let stockInfo = '';\n        if(it.item_type==='card' && it.stock !== undefined) stockInfo = ' <span style=\"color:'+(it.stock>0?'var(--primary)':'#ef4444')+'\">[库存 '+it.stock+']</span>';\n        html += '<div class=\"urow\"><div class=\"info\"><div class=\"nm\">'+esc(it.icon)+' '+esc(it.name)+\n          ' <span style=\"color:var(--primary)\">'+it.price+'积分</span>'+stockInfo+'</div>'+\n          '<div class=\"em\">'+(typeName[it.item_type]||it.item_type)+(it.descr?' · '+esc(it.descr):'')+'</div></div><div class=\"abtns\">'+\n          '<button onclick=\"adminEditShopItem('+it.id+')\">编辑</button>'+\n          (it.item_type==='card' ? '<button onclick=\"adminAddCodes('+it.id+')\">补货</button>' : '')+\n          '<button class=\"danger\" onclick=\"adminDelShopItem('+it.id+')\">删除</button></div></div>';\n      });\n      if(!j.items.length) html += '<div class=\"hint\">暂无商品</div>';\n      html += '</div>';\n    }else if(tab === 'site'){\n      const s = siteSettings;\n      html += '<div class=\"card\">'+\n        '<div class=\"setrow\"><label>站点名称</label><input type=\"text\" id=\"as-name\" value=\"'+esc(s.site_name)+'\"></div>'+\n        '<div class=\"setrow\"><label>Logo（emoji，如 💬）</label><input type=\"text\" id=\"as-logo\" value=\"'+esc(s.site_logo)+'\"></div>'+\n        '<div class=\"setrow\"><label>站点简介</label><input type=\"text\" id=\"as-desc\" value=\"'+esc(s.site_desc||'')+'\" placeholder=\"一句话介绍\"></div>'+\n        '<div class=\"setrow\"><label>全站公告（留空不显示）</label><textarea id=\"as-ann\" style=\"min-height:60px\" placeholder=\"显示在首页顶部的公告…\">'+esc(s.announcement||'')+'</textarea></div>'+\n        '<button class=\"btn\" onclick=\"saveSiteSettings()\">保存设置</button></div>';\n    }\n  }catch(e){ html += '<div class=\"hint\">'+esc(e.message)+'</div>'; }\n  app.innerHTML = html;\n}\nasync function adminBan(uid, banned){\n  if(!confirm(banned ? '禁言该用户？他将无法发帖回帖' : '解除禁言？')) return;\n  try{ await api('/api/admin/users/'+uid+'/ban', {method:'POST', body:JSON.stringify({banned})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function adminRole(uid, is_admin){\n  if(!confirm(is_admin ? '设为管理员？' : '撤销管理员？')) return;\n  try{ await api('/api/admin/users/'+uid+'/role', {method:'POST', body:JSON.stringify({is_admin})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function adminPoints(uid, name, curPoints){\n  const input = prompt('调整 '+name+' 的积分（当前 '+curPoints+' 分），输入正负数，如 100 或 -50：');\n  if(!input) return;\n  const points = Math.floor(Number(input));\n  if(!points){ alert('请输入有效数字'); return; }\n  const reason = prompt('调整原因（选填）：') || '管理员调整';\n  if(!confirm('确定给 '+name+' '+(points>0?'+':'')+points+' 分吗？')) return;\n  try{ await api('/api/admin/users/'+uid+'/points', {method:'POST', body:JSON.stringify({points, reason})}); alert('调整成功'); route(); }\n  catch(e){ alert(e.message); }\n}\nfunction filterUsers(){\n  const q = (document.getElementById('u-search').value || '').toLowerCase().trim();\n  document.querySelectorAll('#u-list .urow').forEach(row=>{\n    row.style.display = !q || (row.dataset.search||'').includes(q) ? '' : 'none';\n  });\n}\nasync function adminDelUser(uid, name){\n  if(!confirm('删除用户「'+name+'」？他的所有主题和回帖也会被删除，不可恢复！')) return;\n  try{ await api('/api/admin/users/'+uid, {method:'DELETE'}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function adminAddAd(){\n  const title = document.getElementById('ad-title').value.trim();\n  const url = document.getElementById('ad-url').value.trim();\n  const img_url = document.getElementById('ad-img').value.trim();\n  const position = document.getElementById('ad-pos').value;\n  if(!title || !url){ alert('标题和链接必填'); return; }\n  try{ await api('/api/admin/ads', {method:'POST', body:JSON.stringify({title, url, img_url, position})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function adminToggleAd(id, enabled){\n  try{ await api('/api/admin/ads/'+id, {method:'PUT', body:JSON.stringify({enabled:!!enabled})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function adminDelAd(id){\n  if(!confirm('删除这条广告？')) return;\n  try{ await api('/api/admin/ads/'+id, {method:'DELETE'}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function adminAddLink(){\n  const name = document.getElementById('lk-name').value.trim();\n  const url = document.getElementById('lk-url').value.trim();\n  const descr = document.getElementById('lk-descr').value.trim();\n  if(!name || !url){ alert('站名和链接必填'); return; }\n  try{ await api('/api/admin/friend-links', {method:'POST', body:JSON.stringify({name, url, descr})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function adminDelLink(id){\n  if(!confirm('删除这个友链？')) return;\n  try{ await api('/api/admin/friend-links/'+id, {method:'DELETE'}); route(); }\n  catch(e){ alert(e.message); }\n}\nlet _shopEditId = 0;\nfunction shopTypeChange(){\n  const t = document.getElementById('si-type').value;\n  document.getElementById('si-duration-row').style.display = t==='pin_card' ? '' : 'none';\n  document.getElementById('si-codes-row').style.display = (t==='card' && !_shopEditId) ? '' : 'none';\n}\nfunction adminEditShopItem(id){\n  const it = (window._shopItems || []).find(x => x.id === id);\n  if(!it) return;\n  _shopEditId = id;\n  document.getElementById('si-name').value = it.name || '';\n  document.getElementById('si-icon').value = it.icon || '';\n  document.getElementById('si-price').value = it.price || '';\n  document.getElementById('si-type').value = it.item_type;\n  document.getElementById('si-type').disabled = true;\n  document.getElementById('si-descr').value = it.descr || '';\n  document.getElementById('si-usage').value = it.usage || '';\n  document.getElementById('si-sort').value = it.sort || 99;\n  try{\n    const p = JSON.parse(it.params || '{}');\n    if(p.duration_hours) document.getElementById('si-duration').value = p.duration_hours;\n  }catch(e){}\n  shopTypeChange();\n  document.getElementById('si-form-title').textContent = '编辑商品';\n  document.getElementById('si-submit').textContent = '保存修改';\n  document.getElementById('si-cancel').style.display = '';\n  window.scrollTo({top: 0, behavior: 'smooth'});\n}\nfunction adminCancelEditShop(){\n  _shopEditId = 0;\n  document.getElementById('si-name').value = '';\n  document.getElementById('si-icon').value = '';\n  document.getElementById('si-price').value = '';\n  document.getElementById('si-type').value = 'pin_card';\n  document.getElementById('si-type').disabled = false;\n  document.getElementById('si-descr').value = '';\n  document.getElementById('si-usage').value = '';\n  document.getElementById('si-sort').value = 99;\n  document.getElementById('si-duration').value = 24;\n  document.getElementById('si-codes').value = '';\n  shopTypeChange();\n  document.getElementById('si-form-title').textContent = '上架商品';\n  document.getElementById('si-submit').textContent = '上架';\n  document.getElementById('si-cancel').style.display = 'none';\n}\nasync function adminAddShopItem(){\n  const name = document.getElementById('si-name').value.trim();\n  const icon = document.getElementById('si-icon').value.trim() || '🎁';\n  const price = parseInt(document.getElementById('si-price').value) || 0;\n  const item_type = document.getElementById('si-type').value;\n  const descr = document.getElementById('si-descr').value.trim();\n  const usage = document.getElementById('si-usage').value.trim();\n  const sort = parseInt(document.getElementById('si-sort').value) || 99;\n  if(!name || !price){ alert('名称和价格必填'); return; }\n  const params = {};\n  if(item_type==='pin_card'){\n    params.duration_hours = parseInt(document.getElementById('si-duration').value) || 24;\n  }\n  // 编辑模式\n  if(_shopEditId){\n    try{\n      await api('/api/admin/shop/items/'+_shopEditId, {method:'PUT', body:JSON.stringify({name, icon, price, descr, usage, sort, params})});\n      route();\n    }catch(e){ alert(e.message); }\n    return;\n  }\n  let codes = [];\n  if(item_type==='card'){\n    codes = document.getElementById('si-codes').value.split('\\n').map(s=>s.trim()).filter(Boolean);\n    if(!codes.length){ alert('卡密商品请填写兑换码，每行一个'); return; }\n  }\n  try{ await api('/api/admin/shop/items', {method:'POST', body:JSON.stringify({name, icon, price, item_type, descr, usage, sort, params, codes})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function adminAddCodes(id){\n  const input = prompt('粘贴兑换码，每行一个：');\n  if(!input) return;\n  const codes = input.split('\\n').map(s=>s.trim()).filter(Boolean);\n  if(!codes.length) return;\n  try{\n    const j = await api('/api/admin/shop/items/'+id+'/codes', {method:'POST', body:JSON.stringify({codes})});\n    alert('补货成功，新增 '+j.added+' 个');\n    route();\n  }catch(e){ alert(e.message); }\n}\nasync function adminDelShopItem(id){\n  if(!confirm('删除这个商品？已购买的用户不受影响。')) return;\n  try{ await api('/api/admin/shop/items/'+id, {method:'DELETE'}); route(); }\n  catch(e){ alert(e.message); }\n}\nfunction adminEditBoard(bid, name, descr, sort){\n  showModal('<h3>编辑版块</h3><div class=\"err\" id=\"m-err\"></div>'+\n    '<input type=\"text\" id=\"m-name\" value=\"'+esc(name)+'\">'+\n    '<input type=\"text\" id=\"m-descr\" value=\"'+esc(descr)+'\" placeholder=\"简介\">'+\n    '<input type=\"text\" id=\"m-sort\" value=\"'+sort+'\" placeholder=\"排序（数字越小越靠前）\">'+\n    '<div class=\"row\"><button class=\"btn ghost\" onclick=\"hideModal()\">取消</button><button class=\"btn\" onclick=\"doAdminEditBoard('+bid+')\">保存</button></div>');\n}\nasync function doAdminEditBoard(bid){\n  const name = document.getElementById('m-name').value.trim();\n  const descr = document.getElementById('m-descr').value.trim();\n  const sort = Number(document.getElementById('m-sort').value) || 99;\n  try{ await api('/api/admin/boards/'+bid, {method:'PUT', body:JSON.stringify({name, descr, sort})}); hideModal(); route(); }\n  catch(e){ document.getElementById('m-err').textContent = e.message; }\n}\nasync function adminDelBoard(bid){\n  if(!confirm('删除这个版块？只能删除空版块')) return;\n  try{ await api('/api/admin/boards/'+bid, {method:'DELETE'}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function handleReport(rid, action){\n  if(!confirm(action === 'delete' ? '删除被举报的内容？' : '驳回这条举报？')) return;\n  try{ await api('/api/admin/reports/'+rid+'/handle', {method:'POST', body:JSON.stringify({action})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function addWord(){\n  const word = document.getElementById('w-word').value.trim();\n  if(!word) return;\n  try{ await api('/api/admin/sensitive-words', {method:'POST', body:JSON.stringify({word})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function delWord(word){\n  try{ await api('/api/admin/sensitive-words/'+encodeURIComponent(word), {method:'DELETE'}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function saveSiteSettings(){\n  const data = {\n    site_name: document.getElementById('as-name').value.trim() || '论坛',\n    site_logo: document.getElementById('as-logo').value.trim() || '💬',\n    site_desc: document.getElementById('as-desc').value.trim(),\n    announcement: document.getElementById('as-ann').value.trim(),\n  };\n  try{\n    await api('/api/admin/settings', {method:'PUT', body:JSON.stringify(data)});\n    await loadSiteSettings();\n    alert('已保存');\n    route();\n  }catch(e){ alert(e.message); }\n}\n\n/* ---------- 个人主页 ---------- */\nasync function viewProfile(uid){\n  setTitle('用户主页');\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  let j;\n  try{ j = await api('/api/users/' + uid); }\n  catch(e){ app.innerHTML = '<div class=\"hint\">'+esc(e.message)+'</div>'; return; }\n  const u = j.user;\n  let html = '<div class=\"crumb\" onclick=\"history.back()\">‹ 返回</div>';\n  html += '<div class=\"card\"><div class=\"profile-hd\">'+\n    avatarHtml(u.avatar_url, u.name, 'big', u.avatar_frame)+\n    '<div class=\"nm\">'+esc(u.name)+(u.is_admin?'<span class=\"admin-tag\">管理</span>':'')+(u.custom_title?'<span style=\"font-size:12px;color:var(--primary);border:1px solid var(--primary);border-radius:4px;padding:1px 6px;margin-left:6px\">'+esc(u.custom_title)+'</span>':'')+levelBadge(u.points||0)+'</div>'+\n    '<div style=\"font-size:13px;color:var(--muted);margin-top:4px\">⭐ '+(u.points||0)+' 积分'+(u.checkin_streak?' · 🔥 连续签到 '+u.checkin_streak+' 天':'')+'</div>'+\n    (u.bio ? '<div style=\"font-size:14px;color:var(--muted);margin-top:8px;max-width:400px;margin-left:auto;margin-right:auto\">'+esc(u.bio)+'</div>' : '')+\n    '<div class=\"st\"><span>'+j.threads.length+' 主题</span><span>'+j.postCount+' 回帖</span><span>加入于 '+new Date(u.created_at).toLocaleDateString()+'</span></div>'+\n    (me && me.id !== u.id ? '<div style=\"margin-top:12px;display:flex;gap:8px;justify-content:center\"><button class=\"btn ghost\" style=\"width:auto;padding:8px 20px\" onclick=\"navigate(\\'/dm/'+u.id+'\\')\">✉️ 发私信</button><button class=\"btn ghost\" style=\"width:auto;padding:8px 20px\" onclick=\"transferPoints('+u.id+',\\''+esc(u.name).replace(/'/g,\"\\\\'\")+'\\')\">💰 转增积分</button></div>' : '')+\n    '</div></div>';\n  // 自己的主页显示积分明细\n  if(me && me.id === u.id){\n    html += '<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px\">⭐ 积分明细</h2><div id=\"point-logs\"><div class=\"hint\">加载中…</div></div></div>';\n  }\n  html += '<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px\">他的主题</h2>';\n  if(!j.threads.length) html += '<div class=\"hint\">还没有发过主题</div>';\n  j.threads.forEach(t=>{\n    html += '<div class=\"thread\" onclick=\"navigate(\\'/t/'+t.id+'\\')\">'+\n      '<div class=\"ti\">'+(t.is_digest?'<span class=\"pin\" style=\"color:#d97706;border-color:#d97706\">精华</span>':'')+(t.is_locked?'<span class=\"pin\" style=\"color:#6b7280;border-color:#6b7280\">🔒</span>':'')+esc(t.title)+'</div>'+\n      '<div class=\"mt\"><span>'+esc(t.board_name)+'</span><span>'+t.reply_count+' 回复</span><span>'+timeAgo(t.updated_at)+'</span></div></div>';\n  });\n  html += '</div>';\n  app.innerHTML = html;\n  // 自己的主页加载积分明细\n  if(typeof me !== 'undefined' && me && me.id === uid){\n    api('/api/point-logs').then(j=>{\n      const box = document.getElementById('point-logs');\n      if(!box) return;\n      if(!j.logs || !j.logs.length){ box.innerHTML = '<div class=\"hint\">暂无积分记录</div>'; return; }\n      box.innerHTML = j.logs.map(l=>\n        '<div style=\"display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:14px\">'+\n        '<span>'+esc(l.reason)+'<span style=\"color:var(--muted);font-size:12px;margin-left:8px\">'+new Date(l.created_at).toLocaleDateString()+'</span></span>'+\n        '<b style=\"color:'+(l.points>0?'var(--primary)':'#e11d48')+'\">'+(l.points>0?'+':'')+l.points+'</b></div>'\n      ).join('');\n    }).catch(()=>{ const b=document.getElementById('point-logs'); if(b) b.innerHTML='<div class=\"hint\">加载失败</div>'; });\n  }\n}\nasync function viewVerify(token){\n  setTitle('邮箱验证');\n  app.innerHTML = '<div class=\"hint\">验证中…</div>';\n  try{\n    await api('/api/verify?token='+encodeURIComponent(token));\n    await refreshMe();\n    app.innerHTML = '<div class=\"card\" style=\"text-align:center;padding:40px 20px\"><div style=\"font-size:48px;margin-bottom:12px\">✅</div><h3>邮箱验证成功！</h3><p style=\"color:var(--muted);font-size:14px;margin:10px 0 20px\">现在可以发帖和回帖了</p><button class=\"btn\" onclick=\"navigate(\\'/\\')\">去逛逛</button></div>';\n  }catch(e){\n    app.innerHTML = '<div class=\"card\" style=\"text-align:center;padding:40px 20px\"><div style=\"font-size:48px;margin-bottom:12px\">❌</div><h3>验证失败</h3><p style=\"color:var(--muted);font-size:14px;margin:10px 0 20px\">'+esc(e.message)+'</p><button class=\"btn\" onclick=\"navigate(\\'/\\')\">返回首页</button></div>';\n  }\n}\nasync function viewReset(token){\n  setTitle('重置密码');\n  app.innerHTML = '<div class=\"card\" style=\"max-width:400px;margin:40px auto\"><h2 class=\"tt\">重置密码</h2><div class=\"err\" id=\"r-err\"></div>'+\n    '<input type=\"password\" id=\"r-pass1\" placeholder=\"新密码（4-64位）\" autocomplete=\"new-password\">'+\n    '<input type=\"password\" id=\"r-pass2\" placeholder=\"确认新密码\" autocomplete=\"new-password\">'+\n    '<button class=\"btn\" onclick=\"doReset(\\''+token+'\\')\">重置密码</button></div>';\n}\nasync function doReset(token){\n  const p1 = document.getElementById('r-pass1').value;\n  const p2 = document.getElementById('r-pass2').value;\n  if(p1 !== p2){ document.getElementById('r-err').textContent = '两次输入不一致'; return; }\n  try{\n    await api('/api/reset-password', {method:'POST', body:JSON.stringify({token, new_password:p1})});\n    app.innerHTML = '<div class=\"card\" style=\"max-width:400px;margin:40px auto;text-align:center\"><div style=\"font-size:48px;margin-bottom:12px\">✅</div><h3>密码重置成功</h3><p style=\"color:var(--muted);font-size:14px;margin:10px 0 20px\">请用新密码登录</p><button class=\"btn\" onclick=\"showLogin()\">去登录</button></div>';\n  }catch(e){ document.getElementById('r-err').textContent = e.message; }\n}\nfunction pager(page, per, total, base){\n  const pages = Math.max(1, Math.ceil(total/per));\n  if(pages<=1) return '';\n  let h = '<div class=\"toolbar\" style=\"justify-content:center;margin:12px 0\">';\n  if(page>1) h += '<button class=\"btn ghost\" onclick=\"navigate(\\''+base+'?p='+(page-1)+'\\')\">‹ 上一页</button>';\n  h += '<span style=\"align-self:center;font-size:13px;color:var(--muted)\">'+page+' / '+pages+'</span>';\n  if(page<pages) h += '<button class=\"btn ghost\" onclick=\"navigate(\\''+base+'?p='+(page+1)+'\\')\">下一页 ›</button>';\n  return h+'</div>';\n}\n\n/* ---------- 首页：最新主题 + 版块列表 ---------- */\nasync function viewBoards(){\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  setTitle('');\n  const [bj, lj] = await Promise.all([api('/api/boards'), api('/api/threads/latest').catch(()=>({threads:[]}))]);\n  let html = verifyBanner() + announcementBanner();\n  try{\n    const st = await api('/api/stats');\n    html += '<div class=\"stat-bar\"><span><b>'+st.todayThreads+'</b>今日主题</span><span><b>'+st.todayPosts+'</b>今日回帖</span><span><b>'+st.todayUsers+'</b>今日新用户</span><span><b>'+st.users+'</b>总用户</span><span><b>'+st.threads+'</b>总主题</span></div>';\n  }catch(e){}\n  if(lj.threads && lj.threads.length){\n    html += '<div class=\"card\"><h2 class=\"tt\" style=\"font-size:16px;margin-bottom:4px\">🔥 最新主题</h2>';\n    lj.threads.slice(0, 10).forEach(t=>{\n      html += '<div class=\"thread\" onclick=\"navigate(\\'/t/'+t.id+'\\')\">'+\n        '<div class=\"ti\">'+(t.pinned?'<span class=\"pin\">置顶</span>':'')+(t.is_digest?'<span class=\"pin\" style=\"color:#d97706;border-color:#d97706\">精华</span>':'')+(t.is_locked?'<span class=\"pin\" style=\"color:#6b7280;border-color:#6b7280\">🔒</span>':'')+esc(t.title)+'</div>'+\n        '<div class=\"mt\"><span style=\"cursor:pointer;color:var(--primary)\" onclick=\"event.stopPropagation();navigate(\\'/u/'+t.user_id+'\\')\">'+esc(t.author)+'</span>'+\n        '<span>'+esc(t.board_name)+'</span><span>'+t.reply_count+' 回复</span>'+\n        (t.last_reply_by && t.last_reply_by !== t.author ? '<span>最后回复 '+esc(t.last_reply_by)+'</span>' : '')+\n        '<span>'+timeAgo(t.updated_at)+'</span></div></div>';\n    });\n    html += '</div>';\n  }\n  if(me && me.is_admin){\n    html += '<div class=\"toolbar\"><button class=\"btn\" onclick=\"showAddBoard()\">＋ 新建版块</button></div>';\n  }\n  app.innerHTML = html;\n}\nfunction showAddBoard(){\n  showModal('<h3>新建版块</h3><div class=\"err\" id=\"m-err\"></div>'+\n    '<input type=\"text\" id=\"m-name\" placeholder=\"版块名\">'+\n    '<input type=\"text\" id=\"m-descr\" placeholder=\"简介（选填）\">'+\n    '<div class=\"row\"><button class=\"btn ghost\" onclick=\"hideModal()\">取消</button><button class=\"btn\" onclick=\"doAddBoard()\">创建</button></div>');\n}\nasync function doAddBoard(){\n  const name = document.getElementById('m-name').value.trim();\n  const descr = document.getElementById('m-descr').value.trim();\n  try{ await api('/api/boards',{method:'POST',body:JSON.stringify({name,descr})}); hideModal(); route(); }\n  catch(e){ document.getElementById('m-err').textContent = e.message; }\n}\n\n/* ---------- 主题列表 ---------- */\nlet curBoard = null;\nasync function viewThreads(bid, page){\n  page = page || 1;\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  let j;\n  try{ j = await api('/api/boards/'+bid+'/threads?page='+page); }\n  catch(e){ app.innerHTML = '<div class=\"hint\">加载失败：'+esc(e.message)+' <a href=\"javascript:route()\">重试</a></div>'; return; }\n  curBoard = j.board;\n\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/\\')\">‹ 全部版块</div>';\n  html += verifyBanner();\n  html += '<div class=\"card\"><div style=\"display:flex;justify-content:space-between;align-items:flex-start;gap:10px\">'+\n    '<div><h2 class=\"tt\">'+esc(j.board.name)+'</h2><div style=\"font-size:13px;color:var(--muted)\">'+esc(j.board.descr||'')+'</div></div>'+\n    (me ? '<button class=\"btn\" style=\"width:auto;white-space:nowrap;padding:10px 20px\" onclick=\"showNewThread()\">＋ 发帖</button>' : '')+'</div>';\n  if(!j.threads.length) html += '<div class=\"hint\">还没有主题，来发第一帖吧</div>';\n  j.threads.forEach((t,i)=>{\n    html += '<div class=\"thread\" onclick=\"navigate(\\'/t/'+t.id+'\\')\">'+\n      '<div class=\"ti\">'+(t.pinned?'<span class=\"pin\">置顶</span>':'')+(t.is_digest?'<span class=\"pin\" style=\"color:#d97706;border-color:#d97706\">精华</span>':'')+(t.is_locked?'<span class=\"pin\" style=\"color:#6b7280;border-color:#6b7280\">🔒</span>':'')+esc(t.title)+'</div>'+\n      '<div class=\"mt\"><span style=\"cursor:pointer;color:var(--primary)\" onclick=\"event.stopPropagation();navigate(\\'/u/'+t.user_id+'\\')\">'+esc(t.author)+'</span><span>'+t.reply_count+' 回复</span><span>'+(t.views||0)+' 浏览</span>'+\n      (t.last_reply_by && t.last_reply_by !== t.author ? '<span>最后回复 '+esc(t.last_reply_by)+'</span>' : '')+\n      '<span>'+timeAgo(t.updated_at)+'</span></div></div>';\n    if((i+1)%5===0) html += adHtml('thread_list');\n  });\n  html += '</div>';\n  html += pager(j.page, j.per, j.total, '/b/'+bid);\n  app.innerHTML = html;\n  setTitle(j.board.name);\n}\nfunction showNewThread(){\n  if(!me){ showLogin(); return; }\n  // 排障求助版块（id=4）自动带出模板\n  const isHelp = curBoard.id === 4;\n  const helpTpl = isHelp ? '**发行版：**\\n\\n**内核版本：**（`uname -r` 查看）\\n\\n**问题描述：**\\n\\n**报错日志：**\\n```\\n（粘贴完整报错）\\n```\\n\\n**已尝试的解决办法：**\\n' : '';\n  showModal('<h3>发帖 · '+esc(curBoard.name)+'</h3><div class=\"err\" id=\"m-err\"></div>'+\n    '<input type=\"text\" id=\"m-title\" placeholder=\"标题\">'+\n    editorToolbar('m-content')+\n    '<textarea id=\"m-content\" placeholder=\"内容…（可用 @用户名 提醒他）\"></textarea>'+\n    '<div class=\"row\"><button class=\"btn ghost\" onclick=\"hideModal()\">取消</button><button class=\"btn\" onclick=\"doNewThread()\">发布</button></div>');\n  if(isHelp){\n    const box = document.getElementById('m-content');\n    // 只有没草稿时才填模板\n    try{ if(!localStorage.getItem('draft-thread-'+curBoard.id)) box.value = helpTpl; }catch(e){ box.value = helpTpl; }\n  }\n  bindDraft('m-content', 'thread-' + curBoard.id);\n  bindDraft('m-title', 'thread-title-' + curBoard.id);\n  bindAtComplete('m-content');\n}\nasync function doNewThread(){\n  const title = document.getElementById('m-title').value.trim();\n  const content = document.getElementById('m-content').value.trim();\n  try{\n    const j = await api('/api/threads',{method:'POST',body:JSON.stringify({board_id:curBoard.id,title,content})});\n    clearDraft('thread-' + curBoard.id); clearDraft('thread-title-' + curBoard.id);\n    hideModal(); navigate('/t/'+j.id);\n  }catch(e){\n    document.getElementById('m-err').textContent = e.message;\n    if(e.message.includes('验证邮箱')){ hideModal(); route(); }\n  }\n}\n\n/* ---------- 主题详情 ---------- */\nlet curPosts = [];\nlet curThreadOpts = { authorOnly: false, orderDesc: false };\nasync function viewThread(tid, page){\n  page = page || 1;\n  app.innerHTML = '<div class=\"hint\">加载中…</div>';\n  let j;\n  try{\n    const qs = '?page='+page+(curThreadOpts.authorOnly?'&author_only=1':'')+(curThreadOpts.orderDesc?'&order=desc':'');\n    j = await api('/api/threads/'+tid+qs);\n  }\n  catch(e){ app.innerHTML = '<div class=\"hint\">'+esc(e.message)+'</div>'; return; }\n  const t = j.thread, canMod = id=> j.me && (j.me.is_admin || id===j.me.id);\n  curPosts = j.posts;\n  curThreadOpts.authorOnly = j.authorOnly; curThreadOpts.orderDesc = j.orderDesc;\n  let html = '<div class=\"crumb\" onclick=\"navigate(\\'/b/'+t.board_id+'\\')\">‹ '+esc(t.board_name)+'</div>'+adHtml('thread_top');\n  html += '<div class=\"card\" style=\"padding:18px\">'+\n    (t.pinned ? '<span class=\"pin\" style=\"color:var(--primary);font-size:12px;border:1px solid var(--primary);border-radius:4px;padding:1px 6px\">置顶</span> ' : '')+\n    (t.is_digest ? '<span class=\"pin\" style=\"color:#d97706;font-size:12px;border:1px solid #d97706;border-radius:4px;padding:1px 6px\">精华</span> ' : '')+\n    (t.is_locked ? '<span class=\"pin\" style=\"color:#6b7280;font-size:12px;border:1px solid #6b7280;border-radius:4px;padding:1px 6px\">🔒 已锁定</span> ' : '')+\n    '<h2 class=\"tt\" style=\"font-size:20px;line-height:1.5;margin:6px 0 12px\">'+esc(t.title)+'</h2>'+\n    '<div style=\"display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted);flex-wrap:wrap\">'+\n      avatarHtml(t.author_avatar, t.author)+\n      '<span style=\"cursor:pointer;color:var(--primary);font-weight:600\" onclick=\"navigate(\\'/u/'+t.user_id+'\\')\">'+esc(t.author)+'</span>'+\n      '<span>·</span><span>'+timeAgo(t.created_at)+'</span>'+\n      '<span>·</span><span>👁 '+(t.views||0)+' 浏览</span>'+\n      '<span>·</span><span>💬 '+Math.max(0,(j.totalAll||j.total)-1)+' 回复</span>'+\n    '</div>'+\n    '<div class=\"thread-tools\">'+\n      (me ? '<button class=\"'+(j.favorited?'on':'')+'\" onclick=\"toggleFav('+t.id+',this)\">'+(j.favorited?'★ 已收藏':'☆ 收藏')+'</button>' : '')+\n      '<button onclick=\"shareThread()\">🔗 分享</button>'+\n      (me ? '<button onclick=\"showReport(\\'thread\\','+t.id+')\">🚨 举报</button>' : '')+\n      '<button class=\"'+(j.authorOnly?'on':'')+'\" onclick=\"toggleAuthorOnly('+t.id+')\">只看楼主</button>'+\n      '<button onclick=\"toggleOrder('+t.id+')\">'+(j.orderDesc?'↓ 倒序':'↑ 正序')+'</button>'+\n    '</div>'+\n    (j.me && j.me.is_admin ? '<div class=\"toolbar\" style=\"margin-top:4px;margin-bottom:0\"><button class=\"btn ghost\" onclick=\"togglePin('+t.id+','+(t.pinned?0:1)+')\">'+(t.pinned?'取消置顶':'置顶')+'</button>'+\n    '<button class=\"btn ghost\" onclick=\"toggleDigest('+t.id+','+(t.is_digest?0:1)+')\">'+(t.is_digest?'取消精华':'设为精华')+'</button>'+\n    '<button class=\"btn ghost\" onclick=\"toggleLock('+t.id+','+(t.is_locked?0:1)+')\">'+(t.is_locked?'🔓 解锁':'🔒 锁定')+'</button>'+\n    '<button class=\"btn ghost\" style=\"color:var(--danger)\" onclick=\"delThread('+t.id+','+t.board_id+')\">删除主题</button></div>' : '')+'</div>';\n  j.posts.forEach((p,i)=>{\n    const floor = j.orderDesc ? (j.total - ((j.page-1)*j.per + i)) : ((j.page-1)*j.per + i + 1);\n    const isOP = p.user_id === t.user_id;\n    const isSolution = p.is_solution === 1;\n    const canMarkSolution = me && (me.id === t.user_id || me.is_admin) && !isOP;\n    let ops = '<button class=\"like'+(p.liked_by_me?' on':'')+'\" onclick=\"toggleLike('+p.id+',this)\">'+(p.liked_by_me?'♥':'♡')+' '+(p.like_count||0)+'</button>';\n    if(me) ops += '<button class=\"opbtn\" onclick=\"quotePost('+p.id+')\">引用</button>';\n    if(canMarkSolution){\n      ops += isSolution\n        ? '<button class=\"opbtn\" style=\"color:var(--primary);font-weight:700\" onclick=\"toggleSolution('+p.id+',0)\">✓ 取消方案</button>'\n        : '<button class=\"opbtn\" onclick=\"toggleSolution('+p.id+',1)\">设为解决方案</button>';\n    }\n    if(me && p.user_id !== me.id) ops += '<button class=\"opbtn\" onclick=\"showReport(\\'post\\','+p.id+')\">举报</button>';\n    if(canMod(p.user_id)){\n      ops += '<button onclick=\"showEditPost('+p.id+')\">编辑</button><button class=\"danger\" onclick=\"delPost('+p.id+')\">删除</button>';\n    }\n    html += '<div class=\"card post'+(isOP?' op-post':'')+(isSolution?' solution-post':'')+'\" data-pid=\"'+p.id+'\">'+\n      '<div class=\"ph\"><div class=\"author-info\">'+avatarHtml(p.avatar_url, p.author, '', p.avatar_frame)+\n      '<div class=\"author-meta\"><div style=\"display:flex;align-items:center;flex-wrap:wrap;gap:4px\">'+authorLink(p.user_id,p.author)+(p.custom_title?'<span style=\"font-size:11px;color:var(--primary);border:1px solid var(--primary);border-radius:4px;padding:0 4px;white-space:nowrap\">'+esc(p.custom_title)+'</span>':'')+'</div>'+\n      '<div class=\"author-sub\">'+(isOP?'<span style=\"color:var(--primary);font-weight:600\">楼主</span> · ':'')+(isSolution?'<span class=\"solution-badge\">✓ 解决方案</span> · ':'')+timeAgo(p.created_at)+(p.updated_at?' · 已编辑':'')+'</div></div></div>'+\n      '<span class=\"floor\">#'+floor+'</span></div>'+\n      '<div class=\"pc\">'+renderContent(p.content)+'</div><div class=\"ops\">'+ops+'</div></div>';\n  });\n  html += adHtml('thread_bottom');\n  html += pager(j.page, j.per, j.total, '/t/'+tid);\n  if(t.is_locked && !(me && me.is_admin)){\n    html += '<div class=\"card\" style=\"text-align:center;padding:24px\"><div style=\"font-size:14px;color:var(--muted)\">🔒 该主题已被管理员锁定，无法回复</div></div>';\n  }else if(me){\n    html += '<div class=\"card\"><h3 style=\"font-size:16px;margin-bottom:12px\">💬 发表回复</h3><div id=\"quote-preview\"></div>'+\n      editorToolbar('reply-box')+\n      '<textarea id=\"reply-box\" placeholder=\"写下你的回复…（可用 @用户名 提醒他）\"></textarea>'+\n      '<button class=\"btn\" onclick=\"doReply('+t.id+')\">回复</button></div>';\n  }else{\n    html += '<div class=\"card\" style=\"text-align:center;padding:24px\"><div style=\"font-size:14px;color:var(--muted);margin-bottom:12px\">登录后参与讨论</div><button class=\"btn\" style=\"width:auto;padding:10px 32px\" onclick=\"showLogin()\">登录 / 注册</button></div>';\n  }\n  app.innerHTML = html;\n  bindDraft('reply-box', 'reply-' + tid);\n  bindAtComplete('reply-box');\n  setTitle(t.title);\n}\nfunction threadPage(){\n  const m = location.pathname.match(/^\\/t\\/(\\d+)/);\n  return m ? Number(m[1]) : null;\n}\nasync function goToPost(pid){\n  try{\n    const j = await api('/api/posts/'+pid+'/locate');\n    navigate('/t/'+j.thread_id+'?p='+j.page);\n    // 等页面渲染后滚动到对应楼层\n    setTimeout(()=>{\n      const el = document.querySelector('[data-pid=\"'+pid+'\"]');\n      if(el){\n        el.scrollIntoView({behavior:'smooth', block:'center'});\n        el.style.boxShadow = '0 0 0 2px var(--primary)';\n        setTimeout(()=>{ el.style.boxShadow = ''; }, 2000);\n      }\n    }, 600);\n  }catch(e){ alert(e.message); }\n}\nfunction showReport(target_type, target_id){\n  showModal('<h3>举报'+(target_type==='thread'?'主题':'回帖')+'</h3><div class=\"err\" id=\"m-err\"></div>'+\n    '<textarea id=\"m-reason\" style=\"min-height:80px\" placeholder=\"请描述举报理由…\"></textarea>'+\n    '<div class=\"row\"><button class=\"btn ghost\" onclick=\"hideModal()\">取消</button><button class=\"btn\" onclick=\"doReport(\\''+target_type+'\\','+target_id+')\">提交举报</button></div>');\n}\nasync function doReport(target_type, target_id){\n  const reason = document.getElementById('m-reason').value.trim();\n  if(!reason){ document.getElementById('m-err').textContent = '请填写举报理由'; return; }\n  try{\n    await api('/api/reports', {method:'POST', body:JSON.stringify({target_type, target_id, reason})});\n    hideModal(); alert('举报已提交，管理员会尽快处理');\n  }catch(e){ document.getElementById('m-err').textContent = e.message; }\n}\nasync function toggleFav(tid, btn){\n  if(!me){ showLogin(); return; }\n  try{\n    const j = await api('/api/threads/'+tid+'/favorite', {method:'POST'});\n    btn.classList.toggle('on', j.favorited);\n    btn.textContent = j.favorited ? '★ 已收藏' : '☆ 收藏';\n  }catch(e){ alert(e.message); }\n}\nfunction shareThread(){\n  const url = location.origin + '/t/' + threadPage();\n  if(navigator.clipboard){ navigator.clipboard.writeText(url).then(()=>alert('链接已复制')).catch(()=>prompt('复制链接：', url)); }\n  else prompt('复制链接：', url);\n}\nfunction toggleAuthorOnly(tid){\n  curThreadOpts.authorOnly = !curThreadOpts.authorOnly;\n  viewThread(tid, 1);\n}\nfunction toggleOrder(tid){\n  curThreadOpts.orderDesc = !curThreadOpts.orderDesc;\n  viewThread(tid, 1);\n}\nwindow.addEventListener('scroll', ()=>{\n  const b = document.getElementById('toTop');\n  if(!b) return;\n  const onThread = /^\\/t\\/\\d+/.test(location.pathname);\n  b.style.display = (onThread && window.scrollY > 400) ? '' : 'none';\n});\nasync function toggleLike(pid, btn){\n  if(!me){ showLogin(); return; }\n  try{\n    const j = await api('/api/posts/'+pid+'/like', {method:'POST'});\n    btn.classList.toggle('on', j.liked);\n    btn.innerHTML = (j.liked?'♥':'♡')+' '+j.count;\n  }catch(e){ alert(e.message); }\n}\nasync function toggleSolution(pid, mark){\n  if(!me){ showLogin(); return; }\n  try{\n    await api('/api/posts/'+pid+(mark?'/solution':'/unsolution'), {method:'POST'});\n    route();\n  }catch(e){ alert(e.message); }\n}\nfunction quotePost(pid){\n  const p = curPosts.find(x=>x.id===pid);\n  if(!p) return;\n  // 计算楼层\n  const idx = curPosts.findIndex(x=>x.id===pid);\n  const floor = idx >= 0 ? idx + 1 : '?';\n  const box = document.getElementById('reply-box');\n  const q = p.content.length > 100 ? p.content.slice(0,100)+'…' : p.content;\n  document.getElementById('quote-preview').innerHTML =\n    '<div class=\"quotebox\">引用 <b>'+esc(p.author)+'</b> #'+floor+'：'+esc(q)+'<div style=\"text-align:right\"><button class=\"opbtn\" style=\"font-size:12px\" onclick=\"clearQuote()\">取消引用</button></div></div>';\n  box.value = '> [quote pid='+p.id+' author='+p.author+' floor='+floor+']\\n> '+p.content.split('\\n').join('\\n> ').slice(0,200)+'\\n\\n' + box.value;\n  box.focus();\n}\nfunction clearQuote(){\n  document.getElementById('quote-preview').innerHTML = '';\n  const box = document.getElementById('reply-box');\n  box.value = box.value.replace(/^> .*\\n\\n/, '');\n}\nfunction showEditPost(pid){\n  const p = curPosts.find(x=>x.id===pid);\n  if(!p) return;\n  showModal('<h3>编辑回帖</h3><div class=\"err\" id=\"m-err\"></div>'+\n    editorToolbar('m-content')+\n    '<textarea id=\"m-content\">'+esc(p.content)+'</textarea>'+\n    '<div class=\"row\"><button class=\"btn ghost\" onclick=\"hideModal()\">取消</button><button class=\"btn\" onclick=\"doEditPost('+pid+')\">保存</button></div>');\n}\nasync function doEditPost(pid){\n  const content = document.getElementById('m-content').value.trim();\n  try{ await api('/api/posts/'+pid,{method:'PUT',body:JSON.stringify({content})}); hideModal(); route(); }\n  catch(e){ document.getElementById('m-err').textContent = e.message; }\n}\nasync function doReply(tid){\n  const content = document.getElementById('reply-box').value.trim();\n  if(!content) return;\n  try{ await api('/api/posts',{method:'POST',body:JSON.stringify({thread_id:tid,content})}); clearDraft('reply-' + tid); route(); }\n  catch(e){ alert(e.message); if(e.message.includes('验证邮箱')) route(); }\n}\nasync function delPost(pid){\n  if(!confirm('删除这条回帖？')) return;\n  try{ const j = await api('/api/posts/'+pid,{method:'DELETE'}); if(j.threadDeleted) navigate('/'); else route(); }\n  catch(e){ alert(e.message); }\n}\nasync function delThread(tid, bid){\n  if(!confirm('删除整个主题？')) return;\n  try{ await api('/api/threads/'+tid,{method:'DELETE'}); navigate('/b/')+bid; }\n  catch(e){ alert(e.message); }\n}\nasync function toggleDigest(tid, digest){\n  try{ await api('/api/threads/'+tid+'/digest',{method:'POST',body:JSON.stringify({digest})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function toggleLock(tid, locked){\n  try{ await api('/api/threads/'+tid+'/lock',{method:'POST',body:JSON.stringify({locked})}); route(); }\n  catch(e){ alert(e.message); }\n}\nasync function togglePin(tid, pinned){\n  try{ await api('/api/threads/'+tid+'/pin',{method:'POST',body:JSON.stringify({pinned})}); route(); }\n  catch(e){ alert(e.message); }\n}\n\nrefreshMe().then(()=>loadSiteSettings()).then(()=>loadAds()).then(()=>{\n  const oe = new URLSearchParams(location.search).get('oauth_error');\n  if(oe){ history.replaceState(null,'',location.pathname); setTimeout(()=>alert('GitHub 登录失败：'+decodeURIComponent(oe)), 300); }\n  loadSidebar(); route();\n});\n</script>\n</body>\n</html>\n";

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...SEC_HEADERS, ...extraHeaders },
  });
}
// 应用层 botguard：AI 训练爬虫 / 脚本客户端 / 漏洞扫描直接 403，不消耗 D1
// 搜索引擎放行（但禁 /api/ 与管理后台）；社交预览放行（分享卡片需要）
function botGuard(req, path) {
  const ua = req.headers.get('User-Agent') || '';
  const block = (reason) => new Response('Forbidden', { status: 403, headers: { ...SEC_HEADERS } });

  // 空 UA：只拦 API，页面放行（防误伤 UA 被剥离的正常浏览器）
  if (!ua.trim() && path.startsWith('/api/')) return block('empty-ua');

  // AI 训练 / 商业采集爬虫
  if (/gptbot|ccbot|claudebot|anthropic|bytespider|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|dataforseo/i.test(ua)) return block('ai-crawler');

  // 脚本客户端与扫描器（RSS 豁免：本来就是给机器读的）
  if (!path.startsWith('/rss') && /curl|python-requests|python-urllib|go-http-client|scrapy|headlesschrome|phantomjs|sqlmap|nuclei|nikto|masscan|zgrab/i.test(ua)) return block('script-client');

  // 漏洞扫描路径
  if (/\/(wp-login|wp-admin|\.env|\.git|phpmyadmin|pma|actuator|server-status|\.svn|\.hg|composer\.json|package\.json)/i.test(path)) return block('scan-path');

  // 搜索引擎：放行，但禁 API 与后台
  if (/googlebot|bingbot|baiduspider|yandexbot|sogou|360spider|duckduckbot/i.test(ua)) {
    if (path.startsWith('/api/') || path.startsWith('/admin')) return block('bot-restricted');
    return null;
  }
  // 社交预览：放行
  if (/twitterbot|telegrambot|discordbot|facebookexternalhit|linkedinbot|slackbot|whatsapp/i.test(ua)) return null;

  return null;
}

// 安全响应头：防点击劫持 / MIME 嗅探 / 限制引用来源
const SEC_HEADERS = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
function getCookie(req, name) {
  const c = req.headers.get('Cookie') || '';
  const m = c.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}
async function sha256hex(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('');
}
/* PBKDF2 慢哈希：新用户直接用；老用户登录时自动升级 */
const PBKDF2_ITER = 100000;
async function pbkdf2Hash(password, saltHex) {
  const enc = new TextEncoder();
  const salt = new Uint8Array(saltHex.match(/../g).map(h => parseInt(h, 16)));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: PBKDF2_ITER, hash: 'SHA-256' }, key, 256);
  return [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function makePassHash(password) {
  const salt = randHex(16);
  const hash = await pbkdf2Hash(password, salt);
  return { salt, hash: 'pbkdf2$' + PBKDF2_ITER + '$' + hash };
}
async function checkPass(password, user) {
  if (user.pass_hash.startsWith('pbkdf2$')) {
    const parts = user.pass_hash.split('$');
    const iter = Number(parts[1]) || PBKDF2_ITER;
    const enc = new TextEncoder();
    const salt = new Uint8Array(user.salt.match(/../g).map(h => parseInt(h, 16)));
    const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: iter, hash: 'SHA-256' }, key, 256);
    const hash = [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
    return hash === parts[2];
  }
  // 老格式 SHA-256：验证通过后自动升级为 PBKDF2（调用方负责更新）
  return (await sha256hex(user.salt + password)) === user.pass_hash;
}
function randHex(n) {
  const b = new Uint8Array(n);
  crypto.getRandomValues(b);
  return [...b].map(x => x.toString(16).padStart(2, '0')).join('');
}
function sessionCookie(token, maxAge) {
  return `sid=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure`;
}
// 积分：静默加，不阻塞主流程
async function addPoints(env, userId, points, reason, relatedId) {
  try {
    await env.DB.prepare('UPDATE users SET points = points + ? WHERE id = ?').bind(points, userId).run();
    // 写积分流水
    if (reason) {
      await env.DB.prepare('INSERT INTO point_logs (user_id, points, reason, related_id, created_at) VALUES (?,?,?,?,?)')
        .bind(userId, points, reason, relatedId || null, Date.now()).run().catch(()=>{});
    }
  } catch (e) {}
}
// 北京时间（UTC+8）的日期字符串 YYYY-MM-DD
function beijingDate(d) {
  const b = new Date((d || Date.now()) + 8 * 3600 * 1000);
  return b.toISOString().slice(0, 10);
}
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
async function currentUser(req, env) {
  const token = getCookie(req, 'sid');
  if (!token) return null;
  const s = await env.DB.prepare('SELECT user_id, expires_at FROM sessions WHERE token=?').bind(token).first();
  if (!s || s.expires_at < Date.now()) return null;
  return await env.DB.prepare('SELECT id, name, is_admin, email, verified, avatar_url, bio, banned, points, checkin_streak, custom_title, avatar_frame FROM users WHERE id=?').bind(s.user_id).first();
}
function requireAdmin(me) {
  if (!me || !me.is_admin) return json({ error: '需要管理员权限' }, 403);
  return null;
}
let sensitiveCache = null;
let sensitiveCacheAt = 0;
async function getSensitiveWords(env) {
  const now = Date.now();
  if (sensitiveCache && now - sensitiveCacheAt < 60000) return sensitiveCache;
  const { results } = await env.DB.prepare('SELECT word FROM sensitive_words').all().catch(() => ({ results: [] }));
  sensitiveCache = results.map(r => r.word);
  sensitiveCacheAt = now;
  return sensitiveCache;
}
async function checkSensitive(env, text) {
  const words = await getSensitiveWords(env);
  for (const w of words) {
    if (w && text.includes(w)) return w;
  }
  return null;
}
async function sendVerificationEmail(env, email, name, token, origin) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: 'no-key' };
  const from = env.FROM_EMAIL || 'mengyu@ooooc.kdns.fr';
  const link = origin + '/verify?token=' + token;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: '论坛 <' + from + '>',
        to: email,
        subject: '请验证你的论坛邮箱',
        html: '<p>你好 ' + escapeHtml(name) + '，</p><p>点击下面的链接验证你的邮箱：</p><p><a href="' + link + '">验证邮箱</a></p><p>链接 24 小时内有效。如果不是你本人操作，请忽略。</p>'
      })
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      return { sent: false, reason: 'resend-' + r.status, detail: t.slice(0, 200) };
    }
    return { sent: true };
  } catch (e) {
    return { sent: false, reason: 'network' };
  }
}
async function ensureSeed(env) {
  const r = await env.DB.prepare('SELECT COUNT(*) AS c FROM boards').first();
  if (r && r.c === 0) {
    await env.DB.prepare("INSERT INTO boards (name, descr, sort) VALUES ('综合讨论','随便聊聊',1)").run();
    await env.DB.prepare("INSERT INTO boards (name, descr, sort) VALUES ('站务公告','管理员发布',2)").run();
  }
}
/* ---------- v1.3 helpers ---------- */
function getClientIp(req) {
  return req.headers.get('CF-Connecting-IP') || req.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || 'unknown';
}
async function checkRateLimit(env, key, limit, windowMs) {
  const now = Date.now();
  const row = await env.DB.prepare('SELECT * FROM rate_limits WHERE key=?').bind(key).first();
  if (!row || now - row.window_start > windowMs) {
    await env.DB.prepare('INSERT OR REPLACE INTO rate_limits (key, count, window_start) VALUES (?,?,?)').bind(key, 1, now).run();
    return true;
  }
  if (row.count >= limit) return false;
  await env.DB.prepare('UPDATE rate_limits SET count=count+1 WHERE key=?').bind(key).run();
  return true;
}
function parseMentions(content) {
  const names = new Set();
  const re = /@([a-zA-Z0-9_\u4e00-\u9fa5]{2,16})/g;
  let m;
  while ((m = re.exec(content)) && names.size < 10) names.add(m[1]);
  return [...names];
}
async function notifyMentions(env, content, fromUserId, threadId, postId) {
  const names = parseMentions(content).filter(n => n);
  if (!names.length) return;
  const now = Date.now();
  const batch = [];
  for (const name of names) {
    const u = await env.DB.prepare('SELECT id FROM users WHERE lower(name)=lower(?)').bind(name).first();
    if (u && u.id !== fromUserId) {
      batch.push(env.DB.prepare(
        'INSERT INTO notifications (user_id, type, from_user_id, thread_id, post_id, created_at) VALUES (?,?,?,?,?,?)'
      ).bind(u.id, 'mention', fromUserId, threadId, postId, now));
    }
  }
  if (batch.length) await env.DB.batch(batch);
}
function sanitizeFts(q) {
  return q.split(/\s+/).filter(Boolean).slice(0, 5)
    .map(t => '"' + t.replace(/"/g, '""') + '"').join(' AND ');
}
/* Turnstile 人机验证：未配置 TURNSTILE_SECRET 时跳过 */
async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip || '' }),
    });
    const j = await r.json();
    return !!j.success;
  } catch (e) { return false; }
}
/* 管理操作日志 */
async function adminLog(env, me, action, target_type, target_id, detail) {
  try {
    await env.DB.prepare(
      'INSERT INTO admin_logs (admin_id, admin_name, action, target_type, target_id, detail, created_at) VALUES (?,?,?,?,?,?,?)'
    ).bind(me.id, me.name, action, target_type || null, target_id || null, detail || null, Date.now()).run();
  } catch (e) {}
}
/* 内容权限块：[hide]回复可见 [level=N]等级可见 [admin]仅管理员 */
function processContentBlocks(content, opts) {
  // opts: { isAuthor, isAdmin, hasReplied, userScore }
  content = content.replace(/\[hide\]([\s\S]*?)\[\/hide\]/gi, (m, inner) => {
    if (opts.isAuthor || opts.isAdmin || opts.hasReplied) return '{{SHOW}}' + inner + '{{/SHOW}}';
    return '{{HIDE}}';
  });
  content = content.replace(/\[level=(\d+)\]([\s\S]*?)\[\/level\]/gi, (m, n, inner) => {
    if (opts.isAuthor || opts.isAdmin || opts.userScore >= Number(n)) return '{{SHOW}}' + inner + '{{/SHOW}}';
    return '{{LEVEL:' + n + '}}';
  });
  content = content.replace(/\[admin\]([\s\S]*?)\[\/admin\]/gi, (m, inner) => {
    if (opts.isAdmin) return '{{SHOW}}' + inner + '{{/SHOW}}';
    return '{{ADMIN}}';
  });
  return content;
}
async function readBody(req) {
  try { return await req.json(); } catch (e) { return {}; }
}

/* ==================================================================
 * AI 每日精选（v2026-10-25）
 * Cron 每 6 小时触发：抓 V2EX / NodeSeek / linux.do 公开订阅源 →
 * 按 URL 去重（ai_ingest 表）→ AI 打分筛选 → AI 写摘要+点评 →
 * 以官方账号「精选君」自动发帖到「📰 每日精选」版块。
 * 红线：只发摘要+点评+原文链接+来源标注，不搬运全文。
 * 开关：settings.ai_digest_enabled = '0' 时 Cron 跳过。
 * 密钥：Worker Secrets —— AI_API_KEY / AI_API_BASE / AI_MODEL。
 * ================================================================== */
const AI_DIGEST_CFG = { PER_RUN: 2, PER_DAY: 6, MIN_SCORE: 70 };
const AI_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const AI_BOT_NAME = '精选君';
const AI_BOARD_NAME = '📰 每日精选';

async function getSetting(env, key, dflt) {
  try {
    const r = await env.DB.prepare('SELECT value FROM settings WHERE key=?').bind(key).first();
    return r ? r.value : dflt;
  } catch (e) { return dflt; }
}
function decodeEntities(s) {
  return String(s == null ? '' : s)
    .replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (m, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}
function stripHtml(s) {
  return decodeEntities(String(s == null ? '' : s)
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]+>/g, ' '))
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}
// 清理 AI 输出：去掉 markdown 标记，避免版式错乱与 @ 误触发
function aiClean(s, max) {
  return String(s == null ? '' : s)
    .replace(/[*`#>@]/g, '').replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max || 500);
}
async function aiFetchText(url, timeoutMs) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs || 15000);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': AI_UA, 'Accept': '*/*' }, signal: ctl.signal, redirect: 'follow' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.text();
  } finally { clearTimeout(t); }
}
async function aiFetchJson(url) { return JSON.parse(await aiFetchText(url)); }

/* ---------- 数据源 ---------- */
async function aiFetchV2ex() {
  const items = [], seen = new Set();
  for (const ep of ['latest', 'hot']) {
    try {
      const arr = await aiFetchJson('https://www.v2ex.com/api/topics/' + ep + '.json');
      for (const t of (Array.isArray(arr) ? arr : []).slice(0, 30)) {
        if (!t || !t.url || !t.title || seen.has(t.url)) continue;
        seen.add(t.url);
        items.push({
          source: 'v2ex', sourceLabel: 'V2EX', url: t.url,
          title: String(t.title).trim(),
          author: t.member ? String(t.member.username || '') : '',
          extra: t.node ? '节点：' + String(t.node.title || '') : '',
          text: String(t.content || '').slice(0, 3000),
        });
      }
    } catch (e) { console.log('[ai-digest] v2ex/' + ep + ' 抓取失败：' + e.message); }
  }
  return items;
}
function aiParseRss(xml, limit) {
  const items = [];
  const pick = (s, tag) => {
    const m = s.match(new RegExp('<' + tag + '>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</' + tag + '>'));
    return m ? m[1].trim() : '';
  };
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) && items.length < limit) {
    const b = m[1];
    items.push({ title: decodeEntities(pick(b, 'title')), link: pick(b, 'link'), desc: stripHtml(pick(b, 'description')), author: pick(b, 'dc:creator') });
  }
  return items;
}
async function aiFetchNodeSeek() {
  const xml = await aiFetchText('https://rss.nodeseek.com/');
  return aiParseRss(xml, 20).filter(x => x.title && x.link).map(x => ({
    source: 'nodeseek', sourceLabel: 'NodeSeek', url: x.link,
    title: x.title, author: x.author || '', extra: '', text: x.desc.slice(0, 3000),
  }));
}
async function aiFetchLinuxDo() {
  const j = await aiFetchJson('https://linux.do/latest.json');
  const users = {};
  (j.users || []).forEach(u => { users[u.id] = u.username; });
  const items = [];
  const topics = (j.topic_list && j.topic_list.topics) || [];
  for (const t of topics.slice(0, 30)) {
    if (!t || !t.title || t.visible === false || t.pinned_globally || t.pinned) continue;
    items.push({
      source: 'linuxdo', sourceLabel: 'linux.do',
      url: 'https://linux.do/t/' + (t.slug || 'topic') + '/' + t.id,
      title: String(t.title).trim(),
      author: (t.posters && t.posters[0]) ? String(users[t.posters[0].user_id] || '') : '',
      extra: '',
      text: stripHtml(t.excerpt || '').slice(0, 3000),
    });
  }
  return items;
}
// linux.do 摘要前补抓首帖全文（excerpt 不够长时）
async function aiFetchLinuxDoFull(item) {
  const m = item.url.match(/(\d+)\/?$/);
  if (!m) return '';
  const j = await aiFetchJson('https://linux.do/t/' + m[1] + '.json');
  const posts = j && j.post_stream && j.post_stream.posts;
  if (!posts || !posts.length) return '';
  return stripHtml(posts[0].cooked || '').slice(0, 3500);
}

/* ---------- AI 调用 ---------- */
async function aiChat(env, messages, maxTokens) {
  if (!env.AI_API_KEY) throw new Error('AI_API_KEY 未配置');
  const base = String(env.AI_API_BASE || 'https://api.openai.com/v1').replace(/\/+$/, '');
  const model = env.AI_MODEL || 'gpt-4o-mini';
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 60000);
  try {
    const r = await fetch(base + '/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + env.AI_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, temperature: 0.3, max_tokens: maxTokens || 2000 }),
      signal: ctl.signal,
    });
    if (!r.ok) throw new Error('AI HTTP ' + r.status);
    const j = await r.json();
    return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
  } finally { clearTimeout(t); }
}
function aiParseJson(s) {
  if (!s) return null;
  const m = String(s).match(/\[[\s\S]*\]|\{[\s\S]*\}/);
  try { return JSON.parse(m ? m[0] : s); } catch (e) { return null; }
}
async function aiScoreBatch(env, batch) {
  const lines = batch.map((it, i) =>
    i + '. [' + it.sourceLabel + '] ' + it.title + (it.text ? '\n   摘录：' + it.text.replace(/\s+/g, ' ').slice(0, 200) : '')
  ).join('\n');
  const prompt = '你是论坛「梦鱼资源」的内容精选编辑。梦鱼资源定位：Linux / VPS / 服务器 / 建站 / 自托管 / AI 工具社区。'
    + '下面是一批候选帖子，请逐条打分（0-100 整数）：\n'
    + '- 高分（70+）：与 VPS、服务器、Linux、建站、自托管、网络技术、AI 工具/模型相关的教程、测评、经验分享、行业资讯、优质工具发布；\n'
    + '- 低分（40 以下）：纯广告、商家促销、affiliate 返利推广、个人交易（收/出/求购/拼车）、抽奖羊毛、灌水闲聊、情感八卦、站务公告、与社区定位无关的内容，这类同时把 ad 标为 true；\n'
    + '- 拿不准给 40-60。\n'
    + '只输出 JSON 数组，每项 {"i": 序号, "score": 数字, "ad": true/false}，不要输出任何其他文字。\n\n候选：\n' + lines;
  const out = await aiChat(env, [{ role: 'user', content: prompt }], 4000);
  const arr = aiParseJson(out);
  if (!Array.isArray(arr)) throw new Error('打分结果解析失败');
  return arr.filter(x => x && Number.isInteger(x.i) && x.i >= 0 && x.i < batch.length)
    .map(x => ({ i: x.i, score: Math.max(0, Math.min(100, Number(x.score) || 0)), ad: !!x.ad }));
}
async function aiSummarize(env, item) {
  const prompt = '请为下面这篇帖子写中文摘要和一句话点评。\n'
    + '要求：\n'
    + '- summary：100-200 字，客观概括原文核心信息，忠实原文，不编造原文没有的事实、数字或结论，不用营销语气；\n'
    + '- comment：一句话点评，40 字以内，指出这篇对 VPS / 服务器 / Linux / 建站 / AI 工具爱好者的价值或看点，语气克制平实。\n'
    + '只输出 JSON：{"summary": "...", "comment": "..."}，不要输出其他文字。\n\n'
    + '标题：' + item.title + '\n来源：' + item.sourceLabel + '\n正文：\n' + (item.text || item.title);
  const parsed = aiParseJson(await aiChat(env, [{ role: 'user', content: prompt }], 1500));
  if (!parsed) return null;
  const summary = aiClean(parsed.summary, 420);
  const comment = aiClean(parsed.comment, 90);
  if (summary.length < 50) return null;
  return { summary, comment };
}

/* ---------- 发帖 ---------- */
async function aiEnsureBoard(env) {
  const b = await env.DB.prepare("SELECT id FROM boards WHERE name LIKE '%每日精选%' ORDER BY id LIMIT 1").first();
  if (b) return b.id;
  const r = await env.DB.prepare('INSERT INTO boards (name, descr, sort) VALUES (?,?,?)')
    .bind(AI_BOARD_NAME, '精选君每日自动精选：VPS / 服务器 / 建站 / Linux / AI 工具优质帖（附摘要与原文链接）', 5).run();
  return r.meta.last_row_id;
}
async function aiEnsureBot(env) {
  const u = await env.DB.prepare('SELECT id FROM users WHERE name=?').bind(AI_BOT_NAME).first();
  if (u) return u.id;
  const r = await env.DB.prepare(
    'INSERT INTO users (name, pass_hash, salt, is_admin, email, verified, bio, created_at, points) VALUES (?,?,?,?,?,?,?,?,?)'
  ).bind(AI_BOT_NAME, 'oauth$', '', 0, '', 1,
    '官方精选机器人 🤖 每日从 V2EX / NodeSeek / linux.do 精选优质帖，AI 生成摘要并附原文链接。',
    Date.now(), 0).run();
  return r.meta.last_row_id;
}
async function aiPostThread(env, boardId, botId, item, sum) {
  const now = Date.now();
  const title = ('[' + item.sourceLabel + '] ' + item.title).slice(0, 100);
  const lines = [];
  lines.push('🤖 AI 自动精选 · 来源：' + item.sourceLabel + (item.extra ? '（' + item.extra + '）' : '') + (item.author ? ' · 原作者：' + item.author : ''));
  lines.push('');
  lines.push('**📝 摘要**');
  lines.push(sum.summary);
  if (sum.comment) {
    lines.push('');
    lines.push('**💡 点评**');
    lines.push(sum.comment);
  }
  lines.push('');
  lines.push('**🔗 原文**');
  lines.push(item.url);
  lines.push('');
  lines.push('（本帖由系统自动精选，摘要由 AI 生成，内容以原文为准）');
  const content = lines.join('\n');
  const r = await env.DB.prepare(
    'INSERT INTO threads (board_id, user_id, title, created_at, updated_at) VALUES (?,?,?,?,?)'
  ).bind(boardId, botId, title, now, now).run();
  const tid = r.meta.last_row_id;
  await env.DB.prepare('INSERT INTO posts (thread_id, user_id, content, created_at) VALUES (?,?,?,?)')
    .bind(tid, botId, content, now).run();
  await env.DB.prepare('INSERT INTO threads_fts (title, content, thread_id) VALUES (?,?,?)')
    .bind(title, content.slice(0, 500), tid).run().catch(() => {});
  return tid;
}

/* ---------- 主管线 ---------- */
async function runAiDigest(env, opts) {
  opts = opts || {};
  const out = { fetched: 0, fresh: 0, scored: 0, passed: 0, posted: 0, postIds: [], errors: [] };
  try {
    if (!env.AI_API_KEY) { out.errors.push('AI_API_KEY 未配置'); return out; }
    const enabled = await getSetting(env, 'ai_digest_enabled', '1');
    if (enabled === '0' && !opts.force) { out.skipped = 'disabled'; return out; }
    // 每日限额（北京时间自然日）
    const now = Date.now();
    const bj = new Date(now + 8 * 3600 * 1000);
    const dayStart = Date.UTC(bj.getUTCFullYear(), bj.getUTCMonth(), bj.getUTCDate()) - 8 * 3600 * 1000;
    const dc = await env.DB.prepare("SELECT COUNT(*) AS n FROM ai_ingest WHERE status='posted' AND created_at>=?")
      .bind(dayStart).first().catch(() => ({ n: 0 }));
    const quota = Math.min(AI_DIGEST_CFG.PER_RUN, AI_DIGEST_CFG.PER_DAY - (dc ? dc.n : 0));
    if (quota <= 0) { out.skipped = 'daily-quota'; return out; }
    // 抓取三源（单源失败不影响其他源）
    let items = [];
    for (const f of [aiFetchV2ex, aiFetchNodeSeek, aiFetchLinuxDo]) {
      try { items = items.concat(await f()); }
      catch (e) { out.errors.push('fetch: ' + e.message); }
    }
    out.fetched = items.length;
    // URL 去重：过滤已入库的
    const fresh = [];
    const seenUrl = new Set();
    for (const it of items) {
      if (!it.url || !it.title || seenUrl.has(it.url)) continue;
      seenUrl.add(it.url);
      const ex = await env.DB.prepare('SELECT id FROM ai_ingest WHERE source_url=?').bind(it.url).first().catch(() => null);
      if (!ex) fresh.push(it);
    }
    out.fresh = fresh.length;
    if (!fresh.length) return out;
    // AI 打分（每批 25 条）
    const scored = [];
    for (let i = 0; i < fresh.length; i += 25) {
      const batch = fresh.slice(i, i + 25);
      try {
        const res = await aiScoreBatch(env, batch);
        for (const s of res) scored.push({ it: batch[s.i], score: s.score, ad: s.ad });
      } catch (e) { out.errors.push('score: ' + e.message); }
    }
    out.scored = scored.length;
    const passed = scored.filter(s => !s.ad && s.score >= AI_DIGEST_CFG.MIN_SCORE)
      .sort((a, b) => b.score - a.score);
    out.passed = passed.length;
    const passedUrls = new Set(passed.map(s => s.it.url));
    // 未入选的先落库标记 skipped，避免下轮重复打分
    for (const s of scored) {
      if (passedUrls.has(s.it.url)) continue;
      await env.DB.prepare('INSERT OR IGNORE INTO ai_ingest (source, source_url, title, score, status, created_at) VALUES (?,?,?,?,?,?)')
        .bind(s.it.source, s.it.url, s.it.title.slice(0, 200), s.score, 'skipped', now).run().catch(() => {});
    }
    if (!passed.length) return out;
    const boardId = await aiEnsureBoard(env);
    const botId = await aiEnsureBot(env);
    for (const s of passed) {
      if (out.posted >= quota) break;
      const it = s.it;
      try {
        if (it.source === 'linuxdo' && (!it.text || it.text.length < 200)) {
          const full = await aiFetchLinuxDoFull(it).catch(() => '');
          if (full) it.text = full;
        }
        const sum = await aiSummarize(env, it);
        if (!sum) throw new Error('摘要生成失败或过短');
        const bad = await checkSensitive(env, it.title + '\n' + sum.summary + '\n' + sum.comment);
        if (bad) throw new Error('命中敏感词');
        const tid = await aiPostThread(env, boardId, botId, it, sum);
        await env.DB.prepare('INSERT OR IGNORE INTO ai_ingest (source, source_url, title, score, status, post_id, created_at) VALUES (?,?,?,?,?,?,?)')
          .bind(it.source, it.url, it.title.slice(0, 200), s.score, 'posted', tid, Date.now()).run();
        out.posted++;
        out.postIds.push(tid);
      } catch (e) {
        out.errors.push('post ' + it.url + ': ' + e.message);
        await env.DB.prepare('INSERT OR IGNORE INTO ai_ingest (source, source_url, title, score, status, created_at) VALUES (?,?,?,?,?,?)')
          .bind(it.source, it.url, it.title.slice(0, 200), s.score, 'failed', Date.now()).run().catch(() => {});
      }
    }
    return out;
  } catch (e) {
    out.errors.push('fatal: ' + (e && e.message));
    return out;
  }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method.toUpperCase();

    // ---------- 应用层 botguard：恶意 UA / 扫描路径直接 403，不查 D1 ----------
    const guardBlock = botGuard(req, path);
    if (guardBlock) return guardBlock;

    // ---------- robots.txt ----------
    if (path === '/robots.txt' && method === 'GET') {
      const origin = new URL(req.url).origin;
      const txt = `User-agent: *\nAllow: /\nDisallow: /api/\nCrawl-delay: 5\nSitemap: ${origin}/sitemap.xml\n`;
      return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8', ...SEC_HEADERS } });
    }
    // ---------- sitemap ----------
    if (path === '/sitemap.xml' && method === 'GET') {
      const origin = new URL(req.url).origin;
      const { results: boards } = await env.DB.prepare('SELECT id FROM boards ORDER BY sort').all().catch(()=>({results:[]}));
      const { results: threads } = await env.DB.prepare('SELECT id, updated_at FROM threads ORDER BY updated_at DESC LIMIT 500').all().catch(()=>({results:[]}));
      let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
      xml += '<url><loc>'+origin+'/</loc><changefreq>hourly</changefreq></url>';
      xml += '<url><loc>'+origin+'/tools</loc><changefreq>daily</changefreq></url>';
      xml += '<url><loc>'+origin+'/tools/quiz</loc><changefreq>weekly</changefreq></url>';
      xml += '<url><loc>'+origin+'/tools/explain</loc><changefreq>weekly</changefreq></url>';
      xml += '<url><loc>'+origin+'/tools/diff</loc><changefreq>weekly</changefreq></url>';
      xml += '<url><loc>'+origin+'/tools/distro</loc><changefreq>weekly</changefreq></url>';
      xml += '<url><loc>'+origin+'/tools/shellcheck</loc><changefreq>weekly</changefreq></url>';
      xml += '<url><loc>'+origin+'/rankings</loc><changefreq>daily</changefreq></url>';
      xml += '<url><loc>'+origin+'/shop</loc><changefreq>daily</changefreq></url>';
      xml += '<url><loc>'+origin+'/rss</loc><changefreq>hourly</changefreq></url>';
      boards.forEach(b=>{ xml += '<url><loc>'+origin+'/b/'+b.id+'</loc><changefreq>hourly</changefreq></url>'; });
      threads.forEach(t=>{
        xml += '<url><loc>'+origin+'/t/'+t.id+'</loc><lastmod>'+new Date(t.updated_at).toISOString()+'</lastmod><changefreq>daily</changefreq></url>';
      });
      xml += '</urlset>';
      return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', ...SEC_HEADERS } });
    }
    // ---------- RSS 订阅 ----------
    if (path === '/rss' && method === 'GET') {
      const origin = new URL(req.url).origin;
      const { results: items } = await env.DB.prepare(
        `SELECT t.id, t.title, t.created_at, t.updated_at, u.name AS author, b.name AS board_name
         FROM threads t JOIN users u ON u.id=t.user_id JOIN boards b ON b.id=t.board_id
         ORDER BY t.updated_at DESC LIMIT 20`
      ).all().catch(()=>({results:[]}));
      const escXml = (s) => String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      let rss = '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>';
      rss += '<title>梦鱼资源</title><link>'+origin+'/</link><description>享技术、资源、心得与生活见闻</description><language>zh-CN</language>';
      for (const t of items) {
        rss += '<item><title>'+escXml(t.title)+'</title>'
          + '<link>'+origin+'/t/'+t.id+'</link>'
          + '<guid>'+origin+'/t/'+t.id+'</guid>'
          + '<author>'+escXml(t.author)+'</author>'
          + '<category>'+escXml(t.board_name)+'</category>'
          + '<pubDate>'+new Date(t.created_at).toUTCString()+'</pubDate></item>';
      }
      rss += '</channel></rss>';
      return new Response(rss, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', ...SEC_HEADERS } });
    }

    // 前端页面（History API 路由：所有非 /api/ 路径都返回 SPA）
    if (path === '/' || !path.startsWith('/api/')) {
      return new Response(APP_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8', ...SEC_HEADERS } });
    }

    await ensureSeed(env);
    const me = await currentUser(req, env);
    const body = (method === 'POST' || method === 'PUT' || method === 'DELETE') ? await readBody(req) : {};
    const seg = path.slice(5).split('/').filter(Boolean); // 去掉 /api/

    try {
      // ---------- 忘记密码 ----------
      if (seg[0] === 'forgot-password' && method === 'POST') {
        const email = String(body.email || '').trim().toLowerCase();
        if (!email) return json({ error: '请填写邮箱' }, 400);
        const u = await env.DB.prepare('SELECT id, name, email FROM users WHERE email=?').bind(email).first();
        // 不透露邮箱是否存在，统一返回成功
        if (u && env.RESEND_API_KEY) {
          await env.DB.prepare('DELETE FROM password_resets WHERE user_id=?').bind(u.id).run();
          const token = randHex(32);
          await env.DB.prepare('INSERT INTO password_resets (token, user_id, created_at, expires_at) VALUES (?,?,?,?)')
            .bind(token, u.id, Date.now(), Date.now() + 3600 * 1000).run();
          const link = new URL(req.url).origin + '/reset?token=' + token;
          const from = env.FROM_EMAIL || 'mengyu@ooooc.kdns.fr';
          try {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: '论坛 <' + from + '>',
                to: u.email,
                subject: '重置你的论坛密码',
                html: '<p>你好 ' + escapeHtml(u.name) + '，</p><p>点击下面的链接重置密码：</p><p><a href="' + link + '">重置密码</a></p><p>链接 1 小时内有效。如果不是你本人操作，请忽略。</p>'
              })
            });
          } catch (e) {}
        }
        return json({ ok: true });
      }
      if (seg[0] === 'reset-password' && method === 'POST') {
        const token = String(body.token || '');
        const newPass = String(body.new_password || '');
        if (newPass.length < 4 || newPass.length > 64) return json({ error: '新密码需 4-64 位' }, 400);
        const pr = await env.DB.prepare('SELECT * FROM password_resets WHERE token=?').bind(token).first();
        if (!pr || pr.expires_at < Date.now()) return json({ error: '链接无效或已过期' }, 400);
        const ph = await makePassHash(newPass);
        await env.DB.batch([
          env.DB.prepare('UPDATE users SET pass_hash=?, salt=? WHERE id=?').bind(ph.hash, ph.salt, pr.user_id),
          env.DB.prepare('DELETE FROM password_resets WHERE user_id=?').bind(pr.user_id),
          env.DB.prepare('DELETE FROM sessions WHERE user_id=?').bind(pr.user_id),
        ]);
        return json({ ok: true });
      }

      // ---------- 认证 ----------
      if (seg[0] === 'register' && method === 'POST') {
        if (!(await verifyTurnstile(env, body.turnstile_token, getClientIp(req)))) {
          return json({ error: '人机验证未通过，请重试' }, 403);
        }
        const ip = getClientIp(req);
        if (!await checkRateLimit(env, 'reg:' + ip, 5, 3600 * 1000)) {
          return json({ error: '注册太频繁，请 1 小时后再试' }, 429);
        }
        const name = String(body.name || '').trim();
        const password = String(body.password || '');
        const email = String(body.email || '').trim().toLowerCase();
        if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$/.test(name)) return json({ error: '用户名需 2-16 位：中文/字母/数字/下划线' }, 400);
        if (password.length < 4 || password.length > 64) return json({ error: '密码需 4-64 位' }, 400);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: '邮箱格式不正确' }, 400);
        const exists = await env.DB.prepare('SELECT id FROM users WHERE lower(name)=lower(?)').bind(name).first();
        if (exists) return json({ error: '用户名已被占用' }, 400);
        const emailExists = await env.DB.prepare('SELECT id FROM users WHERE email=?').bind(email).first();
        if (emailExists) return json({ error: '该邮箱已注册' }, 400);
        const count = await env.DB.prepare('SELECT COUNT(*) AS c FROM users').first();
        const ph = await makePassHash(password);
        const hash = ph.hash; const salt = ph.salt;
        const isAdmin = count.c === 0 ? 1 : 0;
        const r = await env.DB.prepare(
          'INSERT INTO users (name, pass_hash, salt, is_admin, email, verified, created_at) VALUES (?,?,?,?,?,?,?)'
        ).bind(name, hash, salt, isAdmin, email, 0, Date.now()).run();
        const uid = r.meta.last_row_id;
        // 发验证邮件（未配置邮件服务时直接通过，避免锁死）
        let mailSent = false, mailError = null;
        if (env.RESEND_API_KEY) {
          const token = randHex(32);
          await env.DB.prepare('INSERT INTO verify_tokens (token, user_id, created_at, expires_at) VALUES (?,?,?,?)')
            .bind(token, uid, Date.now(), Date.now() + 24 * 3600 * 1000).run();
          const origin = new URL(req.url).origin;
          const ms = await sendVerificationEmail(env, email, name, token, origin);
          mailSent = ms.sent;
          if (!ms.sent) mailError = ms.reason + (ms.detail ? ': ' + ms.detail : '');
        } else {
          await env.DB.prepare('UPDATE users SET verified=1 WHERE id=?').bind(uid).run();
          mailSent = true;
        }
        const token = randHex(32);
        await env.DB.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?,?,?)')
          .bind(token, uid, Date.now() + 30 * 86400 * 1000).run();
        return json({ ok: true, mailSent, mailError, user: { id: uid, name, is_admin: isAdmin, verified: !env.RESEND_API_KEY } },
          200, { 'Set-Cookie': sessionCookie(token, 2592000) });
      }
      if (seg[0] === 'login' && method === 'POST') {
        if (!(await verifyTurnstile(env, body.turnstile_token, getClientIp(req)))) {
          return json({ error: '人机验证未通过，请重试' }, 403);
        }
        const name = String(body.name || '').trim();
        const password = String(body.password || '');
        const u = await env.DB.prepare('SELECT * FROM users WHERE lower(name)=lower(?)').bind(name).first();
        if (!u) return json({ error: '用户名或密码错误' }, 401);
        if (u.pass_hash === 'oauth$') {
          return json({ error: '该账号通过 GitHub 登录，请点击 GitHub 登录按钮' }, 401);
        }
        if (!(await checkPass(password, u))) {
          return json({ error: '用户名或密码错误' }, 401);
        }
        // 老格式密码自动升级为 PBKDF2
        if (!u.pass_hash.startsWith('pbkdf2$')) {
          const up = await makePassHash(password);
          await env.DB.prepare('UPDATE users SET pass_hash=?, salt=? WHERE id=?').bind(up.hash, up.salt, u.id).run();
        }
        const token = randHex(32);
        await env.DB.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?,?,?)')
          .bind(token, u.id, Date.now() + 30 * 86400 * 1000).run();
        return json({ ok: true, user: { id: u.id, name: u.name, is_admin: u.is_admin } },
          200, { 'Set-Cookie': sessionCookie(token, 2592000) });
      }
      if (seg[0] === 'logout' && method === 'POST') {
        const token = getCookie(req, 'sid');
        if (token) await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(token).run();
        return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie('deleted', 0) });
      }
      // ---------- GitHub OAuth ----------
      if (seg[0] === 'auth' && seg[1] === 'github' && method === 'GET' && seg.length === 2) {
        const clientId = env.GITHUB_CLIENT_ID;
        if (!clientId) return new Response('GitHub 登录未配置', { status: 500 });
        const state = randHex(16);
        const redirectUri = new URL(req.url).origin + '/api/auth/github/callback';
        const authUrl = 'https://github.com/login/oauth/authorize?client_id=' + encodeURIComponent(clientId)
          + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&scope=user:email&state=' + state;
        return new Response(null, { status: 302, headers: {
          'Location': authUrl,
          'Set-Cookie': 'oauth_state=' + state + '; Path=/; HttpOnly; SameSite=Lax; Max-Age=600; Secure',
          ...SEC_HEADERS,
        }});
      }
      if (seg[0] === 'auth' && seg[1] === 'github' && seg[2] === 'callback' && method === 'GET') {
        const origin = new URL(req.url).origin;
        const fail = (msg) => new Response(null, { status: 302, headers: { 'Location': origin + '/?oauth_error=' + encodeURIComponent(msg), ...SEC_HEADERS } });
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        const stateCookie = getCookie(req, 'oauth_state');
        if (!code || !state || !stateCookie || state !== stateCookie) return fail('授权验证失败，请重试');
        const clientId = env.GITHUB_CLIENT_ID, clientSecret = env.GITHUB_CLIENT_SECRET;
        if (!clientId || !clientSecret) return fail('GitHub 登录未配置');
        // code 换 access_token
        let tokenData;
        try {
          const tr = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'User-Agent': 'qiewo-forum' },
            body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
          });
          tokenData = await tr.json();
        } catch (e) { return fail('换取令牌失败'); }
        const accessToken = tokenData.access_token;
        if (!accessToken) return fail('授权失败：' + (tokenData.error_description || tokenData.error || '未知错误'));
        // 拉用户信息
        let ghUser, ghEmails = [];
        try {
          const ur = await fetch('https://api.github.com/user', {
            headers: { 'Authorization': 'Bearer ' + accessToken, 'User-Agent': 'qiewo-forum', 'Accept': 'application/vnd.github+json' },
          });
          ghUser = await ur.json();
          const er = await fetch('https://api.github.com/user/emails', {
            headers: { 'Authorization': 'Bearer ' + accessToken, 'User-Agent': 'qiewo-forum', 'Accept': 'application/vnd.github+json' },
          });
          ghEmails = await er.json().catch(() => []);
        } catch (e) { return fail('获取用户信息失败'); }
        if (!ghUser || !ghUser.id) return fail('获取用户信息失败');
        const ghId = String(ghUser.id);
        let email = (ghUser.email || '').toLowerCase();
        if ((!email || ghUser.email === null) && Array.isArray(ghEmails)) {
          const primary = ghEmails.find(e => e.primary && e.verified) || ghEmails.find(e => e.verified);
          if (primary) email = primary.email.toLowerCase();
        }
        // 1. 已绑定的 OAuth 账号 → 直接登录
        let user = null;
        const bound = await env.DB.prepare('SELECT user_id FROM oauth_accounts WHERE provider=? AND provider_user_id=?').bind('github', ghId).first();
        if (bound) {
          user = await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(bound.user_id).first();
        }
        // 2. 同邮箱账号 → 绑定并登录
        if (!user && email) {
          const byEmail = await env.DB.prepare('SELECT * FROM users WHERE lower(email)=lower(?)').bind(email).first();
          if (byEmail) {
            user = byEmail;
            await env.DB.prepare('INSERT OR IGNORE INTO oauth_accounts (user_id, provider, provider_user_id, created_at) VALUES (?,?,?,?)')
              .bind(user.id, 'github', ghId, Date.now()).run();
          }
        }
        // 3. 新建账号
        if (!user) {
          let name = String(ghUser.login || 'gh_user').slice(0, 16).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5]/g, '_') || 'gh_user';
          // 用户名冲突加后缀
          let tryName = name, suffix = 0;
          while (await env.DB.prepare('SELECT 1 FROM users WHERE lower(name)=lower(?)').bind(tryName).first()) {
            suffix++;
            tryName = (name + '_' + suffix).slice(0, 16);
            if (suffix > 99) return fail('用户名分配失败，请联系管理员');
          }
          name = tryName;
          const count = await env.DB.prepare('SELECT COUNT(*) AS c FROM users').first();
          const isAdmin = count.c === 0 ? 1 : 0;
          // OAuth 用户无密码，pass_hash 存空标记
          const r = await env.DB.prepare(
            'INSERT INTO users (name, email, pass_hash, salt, verified, is_admin, created_at, points) VALUES (?,?,?,?,?,?,?,?)'
          ).bind(name, email || '', 'oauth$', '', email ? 1 : 0, isAdmin, Date.now(), 0).run();
          const uid = r.meta.last_row_id;
          await env.DB.prepare('INSERT INTO oauth_accounts (user_id, provider, provider_user_id, created_at) VALUES (?,?,?,?)')
            .bind(uid, 'github', ghId, Date.now()).run();
          user = await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(uid).first();
        }
        if (!user) return fail('登录失败');
        if (user.banned) return fail('账号已被封禁');
        // 发会话 cookie，跳回首页
        const token = randHex(32);
        await env.DB.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?,?,?)')
          .bind(token, user.id, Date.now() + 30 * 86400 * 1000).run();
        const h = new Headers({ 'Location': origin + '/', ...SEC_HEADERS });
        h.append('Set-Cookie', sessionCookie(token, 2592000));
        h.append('Set-Cookie', 'oauth_state=deleted; Path=/; Max-Age=0');
        return new Response(null, { status: 302, headers: h });
      }
      // ---------- OAuth 绑定管理 ----------
      if (seg[0] === 'oauth' && seg[1] === 'bindings' && method === 'GET') {
        if (!me) return json({ error: '请先登录' }, 401);
        const { results } = await env.DB.prepare('SELECT provider, provider_user_id, created_at FROM oauth_accounts WHERE user_id=?').bind(me.id).all();
        return json({ bindings: results || [], githubConfigured: !!env.GITHUB_CLIENT_ID });
      }
      if (seg[0] === 'oauth' && seg[1] === 'unbind' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const provider = String(body.provider || '');
        // 解绑前确认还有密码登录方式（防锁死）
        const u = await env.DB.prepare('SELECT pass_hash FROM users WHERE id=?').bind(me.id).first();
        if (u && u.pass_hash === 'oauth$') {
          return json({ error: '这是你唯一的登录方式，请先在设置里设置密码后再解绑' }, 400);
        }
        await env.DB.prepare('DELETE FROM oauth_accounts WHERE user_id=? AND provider=?').bind(me.id, provider).run();
        return json({ ok: true });
      }
      if (seg[0] === 'me' && method === 'GET') {
        return json({ user: me ? { id: me.id, name: me.name, is_admin: me.is_admin, email: me.email, verified: me.verified, avatar_url: me.avatar_url, bio: me.bio, points: me.points, custom_title: me.custom_title, avatar_frame: me.avatar_frame } : null });
      }
      // ---------- 积分明细 ----------
      if (seg[0] === 'point-logs' && method === 'GET') {
        if (!me) return json({ error: '请先登录' }, 401);
        const { results } = await env.DB.prepare(
          'SELECT * FROM point_logs WHERE user_id=? ORDER BY created_at DESC LIMIT 50'
        ).bind(me.id).all().catch(() => ({ results: [] }));
        return json({ logs: results });
      }
      // ---------- 排行榜 ----------
      // GET /api/rankings?type=points|threads|replies|activity&period=week|month|all
      if (seg[0] === 'rankings' && method === 'GET') {
        const type = url.searchParams.get('type') || 'points';
        const period = url.searchParams.get('period') || 'all';
        const now = Date.now();
        let since = 0;
        if (period === 'week') since = now - 7 * 86400000;
        else if (period === 'month') since = now - 30 * 86400000;
        let results = [];
        try {
          if (type === 'points') {
            if (period === 'all') {
              const r = await env.DB.prepare(
                'SELECT id, name, avatar_url, points, custom_title FROM users ORDER BY points DESC LIMIT 20'
              ).all();
              results = r.results.map(u => ({ ...u, score: u.points }));
            } else {
              const r = await env.DB.prepare(
                `SELECT u.id, u.name, u.avatar_url, u.custom_title, COALESCE(SUM(pl.points),0) AS score
                 FROM users u LEFT JOIN point_logs pl ON pl.user_id=u.id AND pl.created_at>=?
                 GROUP BY u.id HAVING score != 0 ORDER BY score DESC LIMIT 20`
              ).bind(since).all();
              results = r.results;
            }
          } else if (type === 'threads') {
            const r = await env.DB.prepare(
              `SELECT u.id, u.name, u.avatar_url, u.custom_title, COUNT(t.id) AS score
               FROM users u JOIN threads t ON t.user_id=u.id${since ? ' AND t.created_at>=' + since : ''}
               GROUP BY u.id ORDER BY score DESC LIMIT 20`
            ).all();
            results = r.results;
          } else if (type === 'replies') {
            // 回帖数 = posts 数 - threads 数（排除每个主题的首帖）
            const r = await env.DB.prepare(
              `SELECT u.id, u.name, u.avatar_url, u.custom_title,
                      (SELECT COUNT(*) FROM posts p WHERE p.user_id=u.id${since ? ' AND p.created_at>=' + since : ''}) -
                      (SELECT COUNT(*) FROM threads t WHERE t.user_id=u.id${since ? ' AND t.created_at>=' + since : ''}) AS score
               FROM users u ORDER BY score DESC LIMIT 20`
            ).all();
            results = r.results.filter(u => u.score > 0);
          } else if (type === 'activity') {
            // 活跃度 = 发帖*5 + 回帖*2 + 签到次数*3
            const r = await env.DB.prepare(
              `SELECT u.id, u.name, u.avatar_url, u.custom_title,
                      (SELECT COUNT(*) FROM threads t WHERE t.user_id=u.id${since ? ' AND t.created_at>=' + since : ''}) * 5 +
                      ((SELECT COUNT(*) FROM posts p WHERE p.user_id=u.id${since ? ' AND p.created_at>=' + since : ''}) -
                       (SELECT COUNT(*) FROM threads t2 WHERE t2.user_id=u.id${since ? ' AND t2.created_at>=' + since : ''})) * 2 +
                      (SELECT COUNT(*) FROM checkins c WHERE c.user_id=u.id${since ? ' AND c.created_at>=' + since : ''}) * 3 AS score
               FROM users u ORDER BY score DESC LIMIT 20`
            ).all();
            results = r.results.filter(u => u.score > 0);
          }
        } catch (e) { results = []; }
        return json({ rankings: results, type, period });
      }
      // ---------- 积分商城 ----------
      // GET /api/shop/items 商品列表
      if (seg[0] === 'shop' && seg[1] === 'items' && method === 'GET') {
        const { results } = await env.DB.prepare(
          'SELECT * FROM shop_items ORDER BY sort'
        ).all().catch(() => ({ results: [] }));
        // 卡密商品附带库存
        for (const it of results) {
          if (it.item_type === 'card') {
            const s = await env.DB.prepare(
              'SELECT COUNT(*) AS n FROM card_codes WHERE item_id=? AND used_by IS NULL'
            ).bind(it.id).first().catch(()=>({n:0}));
            it.stock = s.n;
          }
          try { it.params = JSON.parse(it.params || '{}'); } catch(e){ it.params = {}; }
        }
        return json({ items: results });
      }
      // POST /api/shop/buy 购买 {item_id}
      if (seg[0] === 'shop' && seg[1] === 'buy' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const itemId = Number(body.item_id);
        const item = await env.DB.prepare('SELECT * FROM shop_items WHERE id=?').bind(itemId).first();
        if (!item) return json({ error: '商品不存在' }, 404);
        const u = await env.DB.prepare('SELECT points FROM users WHERE id=?').bind(me.id).first();
        if ((u.points || 0) < item.price) return json({ error: '积分不足' }, 400);
        const now = Date.now();
        let extra = null;
        // 卡密商品：分配一个未使用的码
        if (item.item_type === 'card') {
          const code = await env.DB.prepare(
            'SELECT id, code FROM card_codes WHERE item_id=? AND used_by IS NULL LIMIT 1'
          ).bind(itemId).first();
          if (!code) return json({ error: '该商品已售罄' }, 400);
          await env.DB.prepare('UPDATE card_codes SET used_by=?, used_at=? WHERE id=? AND used_by IS NULL')
            .bind(me.id, now, code.id).run();
          // 确认抢到（防并发）
          const check = await env.DB.prepare('SELECT used_by FROM card_codes WHERE id=?').bind(code.id).first();
          if (check.used_by !== me.id) return json({ error: '手慢了，刚被抢完' }, 400);
          extra = code.code;
        }
        await env.DB.prepare('UPDATE users SET points = points - ? WHERE id=?').bind(item.price, me.id).run();
        await env.DB.prepare('INSERT INTO point_logs (user_id, points, reason, related_id, created_at) VALUES (?,?,?,?,?)')
          .bind(me.id, -item.price, '兑换商品：' + item.name, itemId, now).run().catch(()=>{});
        const r = await env.DB.prepare(
          'INSERT INTO user_items (user_id, item_id, extra, created_at) VALUES (?,?,?,?)'
        ).bind(me.id, itemId, extra, now).run();
        const userItemId = r.meta.last_row_id;
        // 视频链接商品：生成观看 token（30 天有效）
        let watchToken = null;
        if (item.item_type === 'video_link') {
          watchToken = [...crypto.getRandomValues(new Uint8Array(16))].map(b => b.toString(16).padStart(2, '0')).join('');
          const expiresAt = now + 30 * 24 * 3600 * 1000;
          await env.DB.prepare(
            'INSERT INTO video_tokens (token, user_id, item_id, user_item_id, expires_at, created_at) VALUES (?,?,?,?,?,?)'
          ).bind(watchToken, me.id, itemId, userItemId, expiresAt, now).run();
        }
        return json({ ok: true, user_item_id: userItemId, code: extra, watch_token: watchToken });
      }
      // GET /api/shop/my-items 我的物品
      if (seg[0] === 'shop' && seg[1] === 'my-items' && method === 'GET') {
        if (!me) return json({ error: '请先登录' }, 401);
        const { results } = await env.DB.prepare(
          `SELECT ui.*, si.name, si.descr, si.icon, si.item_type, si.params FROM user_items ui
           JOIN shop_items si ON si.id=ui.item_id WHERE ui.user_id=? ORDER BY ui.created_at DESC`
        ).bind(me.id).all().catch(() => ({ results: [] }));
        // 视频类商品附带观看 token
        for (const it of results) {
          if (it.item_type === 'video_link') {
            const vt = await env.DB.prepare('SELECT token, expires_at FROM video_tokens WHERE user_item_id=?').bind(it.id).first().catch(()=>null);
            if (vt) { it.watch_token = vt.token; it.watch_expires = vt.expires_at; }
          }
        }
        return json({ items: results });
      }
      // GET /api/watch/:token 获取视频播放地址（token 鉴权）
      if (seg[0] === 'watch' && seg[1] && method === 'GET') {
        const token = seg[1];
        const vt = await env.DB.prepare('SELECT * FROM video_tokens WHERE token=?').bind(token).first();
        if (!vt) return json({ error: '链接无效或已失效' }, 404);
        if (vt.expires_at < Date.now()) return json({ error: '链接已过期' }, 410);
        const item = await env.DB.prepare('SELECT params, name FROM shop_items WHERE id=?').bind(vt.item_id).first();
        if (!item) return json({ error: '商品不存在' }, 404);
        let params = {};
        try { params = JSON.parse(item.params || '{}'); } catch(e){}
        // 兼容旧数据：url 单个 / urls 数组
        let urls = [];
        if (Array.isArray(params.urls)) urls = params.urls.filter(u => /^https?:\/\//.test(u));
        else if (params.url && /^https?:\/\//.test(params.url)) urls = [params.url];
        if (!urls.length) return json({ error: '视频地址未配置' }, 500);
        // 增加播放计数
        await env.DB.prepare('UPDATE video_tokens SET view_count = view_count + 1 WHERE token=?').bind(token).run().catch(()=>{});
        return json({ ok: true, urls, name: item.name, expires_at: vt.expires_at });
      }
      // POST /api/shop/use 使用道具 {user_item_id, extra?, thread_id?}
      if (seg[0] === 'shop' && seg[1] === 'use' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const uiId = Number(body.user_item_id);
        const ui = await env.DB.prepare(
          `SELECT ui.*, si.item_type, si.name, si.params FROM user_items ui JOIN shop_items si ON si.id=ui.item_id
           WHERE ui.id=? AND ui.user_id=?`
        ).bind(uiId, me.id).first();
        if (!ui) return json({ error: '物品不存在' }, 404);
        if (ui.used) return json({ error: '已使用过' }, 400);
        const now = Date.now();
        const extra = String(body.extra || '').trim().slice(0, 20);
        if (ui.item_type === 'rename_card') {
          if (!extra) return json({ error: '请填写新用户名' }, 400);
          // 30天内限用1次
          const lastRename = await env.DB.prepare(
            `SELECT used_at FROM user_items ui JOIN shop_items si ON si.id=ui.item_id
             WHERE ui.user_id=? AND si.item_type='rename_card' AND ui.used=1 ORDER BY ui.used_at DESC LIMIT 1`
          ).bind(me.id).first();
          if (lastRename && now - lastRename.used_at < 30 * 86400000) {
            const daysLeft = Math.ceil((30 * 86400000 - (now - lastRename.used_at)) / 86400000);
            return json({ error: '改名卡30天内限用1次，还需等待 ' + daysLeft + ' 天' }, 400);
          }
          const exists = await env.DB.prepare('SELECT 1 FROM users WHERE lower(name)=lower(?)').bind(extra).first();
          if (exists) return json({ error: '用户名已存在' }, 400);
          await env.DB.prepare('UPDATE users SET name=? WHERE id=?').bind(extra, me.id).run();
        } else if (ui.item_type === 'avatar_frame') {
          await env.DB.prepare('UPDATE users SET avatar_frame=1 WHERE id=?').bind(me.id).run();
        } else if (ui.item_type === 'custom_title') {
          if (!extra) return json({ error: '请填写头衔' }, 400);
          await env.DB.prepare('UPDATE users SET custom_title=? WHERE id=?').bind(extra, me.id).run();
        } else if (ui.item_type === 'pin_card') {
          const threadId = Number(body.thread_id);
          if (!threadId) return json({ error: '请选择要置顶的帖子' }, 400);
          const t = await env.DB.prepare('SELECT id FROM threads WHERE id=? AND user_id=?').bind(threadId, me.id).first();
          if (!t) return json({ error: '只能置顶自己的帖子' }, 403);
          // 时长从商品 params 读，默认24小时
          let hours = 24;
          try { const p = JSON.parse(ui.params || '{}'); if (p.duration_hours) hours = Math.max(1, Math.min(720, Number(p.duration_hours))); } catch(e){}
          await env.DB.prepare('UPDATE threads SET pinned=1, pinned_until=? WHERE id=?')
            .bind(now + hours * 3600 * 1000, threadId).run();
        } else if (ui.item_type === 'card') {
          return json({ error: '卡密商品无需使用，兑换码已在我的物品中' }, 400);
        } else {
          return json({ error: '未知道具类型' }, 400);
        }
        await env.DB.prepare('UPDATE user_items SET used=1, used_at=?, extra=? WHERE id=?')
          .bind(now, extra || null, uiId).run();
        return json({ ok: true });
      }
      // ---------- 积分转增 ----------
      // POST /api/points/transfer {to_user_id, amount}
      if (seg[0] === 'points' && seg[1] === 'transfer' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const toId = Number(body.to_user_id);
        const amount = Math.floor(Number(body.amount));
        if (!toId || toId === me.id) return json({ error: '参数错误' }, 400);
        if (!amount || amount < 1) return json({ error: '转增数量至少 1 分' }, 400);
        if (amount > 1000) return json({ error: '单次最多转增 1000 分' }, 400);
        const target = await env.DB.prepare('SELECT id, name FROM users WHERE id=?').bind(toId).first();
        if (!target) return json({ error: '用户不存在' }, 404);
        const u = await env.DB.prepare('SELECT points FROM users WHERE id=?').bind(me.id).first();
        if ((u.points || 0) < amount) return json({ error: '积分不足' }, 400);
        const now = Date.now();
        await env.DB.prepare('UPDATE users SET points = points - ? WHERE id=?').bind(amount, me.id).run();
        await env.DB.prepare('UPDATE users SET points = points + ? WHERE id=?').bind(amount, toId).run();
        await env.DB.prepare('INSERT INTO point_logs (user_id, points, reason, related_id, created_at) VALUES (?,?,?,?,?)')
          .bind(me.id, -amount, '转增给 ' + target.name, toId, now).run().catch(()=>{});
        await env.DB.prepare('INSERT INTO point_logs (user_id, points, reason, related_id, created_at) VALUES (?,?,?,?,?)')
          .bind(toId, amount, '收到 ' + me.name + ' 转增', me.id, now).run().catch(()=>{});
        return json({ ok: true });
      }
      // ---------- 管理员手动调积分 ----------
      // POST /api/admin/users/:id/points {points, reason}
      if (seg[0] === 'admin' && seg[1] === 'users' && seg[3] === 'points' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const uid = Number(seg[2]);
        const points = Math.floor(Number(body.points));
        const reason = String(body.reason || '管理员调整').trim().slice(0, 50) || '管理员调整';
        if (!uid || !points) return json({ error: '参数错误' }, 400);
        if (Math.abs(points) > 10000) return json({ error: '单次最多调整 10000 分' }, 400);
        const target = await env.DB.prepare('SELECT id FROM users WHERE id=?').bind(uid).first();
        if (!target) return json({ error: '用户不存在' }, 404);
        await env.DB.prepare('UPDATE users SET points = points + ? WHERE id=?').bind(points, uid).run();
        await env.DB.prepare('INSERT INTO point_logs (user_id, points, reason, created_at) VALUES (?,?,?,?)')
          .bind(uid, points, reason, Date.now()).run().catch(()=>{});
        await adminLog(env, me, '调整积分 ' + (points > 0 ? '+' : '') + points, 'user', uid, null);
        return json({ ok: true });
      }
      // ---------- 广告 & 友链（前台） ----------
      // GET /api/ads 按位置返回启用的广告
      if (seg[0] === 'ads' && method === 'GET') {
        const { results } = await env.DB.prepare(
          'SELECT * FROM ads WHERE enabled=1 ORDER BY position, sort'
        ).all().catch(() => ({ results: [] }));
        const grouped = {};
        results.forEach(a => {
          if (!grouped[a.position]) grouped[a.position] = [];
          grouped[a.position].push(a);
        });
        return json({ ads: grouped });
      }
      // POST /api/ads/:id/click 点击统计
      if (seg[0] === 'ads' && seg[2] === 'click' && method === 'POST') {
        const id = Number(seg[1]);
        await env.DB.prepare('UPDATE ads SET clicks=clicks+1 WHERE id=?').bind(id).run().catch(()=>{});
        return json({ ok: true });
      }
      // GET /api/friend-links
      if (seg[0] === 'friend-links' && method === 'GET') {
        const { results } = await env.DB.prepare(
          'SELECT * FROM friend_links ORDER BY sort'
        ).all().catch(() => ({ results: [] }));
        return json({ links: results });
      }
      // ---------- 广告 & 友链（后台管理） ----------
      if (seg[0] === 'admin' && seg[1] === 'ads' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const { results } = await env.DB.prepare('SELECT * FROM ads ORDER BY position, sort').all();
        return json({ ads: results });
      }
      if (seg[0] === 'admin' && seg[1] === 'ads' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const title = String(body.title || '').trim().slice(0, 50);
        const url = String(body.url || '').trim().slice(0, 500);
        const img_url = String(body.img_url || '').trim().slice(0, 500);
        const position = String(body.position || '');
        const sort = Number(body.sort) || 99;
        if (!title || !url || !position) return json({ error: '参数不完整' }, 400);
        const r = await env.DB.prepare(
          'INSERT INTO ads (title, url, img_url, position, sort, created_at) VALUES (?,?,?,?,?,?)'
        ).bind(title, url, img_url || null, position, sort, Date.now()).run();
        await adminLog(env, me, '添加广告', 'ad', r.meta.last_row_id, null);
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (seg[0] === 'admin' && seg[1] === 'ads' && seg.length === 3 && method === 'PUT') {
        const deny = requireAdmin(me); if (deny) return deny;
        const id = Number(seg[2]);
        // 支持部分更新：只更新提供的字段
        if (body.enabled !== undefined && Object.keys(body).length === 1) {
          await env.DB.prepare('UPDATE ads SET enabled=? WHERE id=?').bind(body.enabled ? 1 : 0, id).run();
          return json({ ok: true });
        }
        const { title, url, img_url, position, sort, enabled } = body;
        await env.DB.prepare(
          'UPDATE ads SET title=?, url=?, img_url=?, position=?, sort=?, enabled=? WHERE id=?'
        ).bind(String(title||'').slice(0,50), String(url||'').slice(0,500), String(img_url||'').slice(0,500) || null,
               String(position||''), Number(sort)||99, enabled ? 1 : 0, id).run();
        return json({ ok: true });
      }
      if (seg[0] === 'admin' && seg[1] === 'ads' && seg.length === 3 && method === 'DELETE') {
        const deny = requireAdmin(me); if (deny) return deny;
        await env.DB.prepare('DELETE FROM ads WHERE id=?').bind(Number(seg[2])).run();
        return json({ ok: true });
      }
      // GET /api/admin/shop/items 商品管理列表（含禁用）
      if (seg[0] === 'admin' && seg[1] === 'shop' && seg[2] === 'items' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const { results } = await env.DB.prepare('SELECT * FROM shop_items ORDER BY sort').all();
        for (const it of results) {
          if (it.item_type === 'card') {
            const s = await env.DB.prepare(
              'SELECT COUNT(*) AS n FROM card_codes WHERE item_id=? AND used_by IS NULL'
            ).bind(it.id).first().catch(()=>({n:0}));
            it.stock = s.n;
          }
        }
        return json({ items: results });
      }
      // POST /api/admin/shop/items 新增商品
      if (seg[0] === 'admin' && seg[1] === 'shop' && seg[2] === 'items' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const { name, descr, price, icon, item_type, sort, params, codes, usage } = body;
        if (!name || !price || !item_type) return json({ error: '名称、价格、类型必填' }, 400);
        if (!['pin_card', 'rename_card', 'avatar_frame', 'custom_title', 'card', 'video_link'].includes(item_type)) return json({ error: '类型无效' }, 400);
        // video_link 类型必须填视频地址（支持多个，每行一个）
        if (item_type === 'video_link') {
          const p = params || {};
          const urls = Array.isArray(p.urls) ? p.urls.filter(u => /^https?:\/\//.test(u)) : (p.url && /^https?:\/\//.test(p.url) ? [p.url] : []);
          if (!urls.length) return json({ error: '视频类型必须填写至少一个有效的视频地址' }, 400);
          params.urls = urls;
          delete params.url; // 统一用 urls 数组
        }
        const paramsStr = JSON.stringify(params || {});
        const r = await env.DB.prepare(
          'INSERT INTO shop_items (name, descr, usage, price, icon, item_type, sort, params, created_at) VALUES (?,?,?,?,?,?,?,?,?)'
        ).bind(name, descr || '', usage || '', Math.max(1, Number(price) | 0), icon || '🎁', item_type, Number(sort) || 99, paramsStr, Date.now()).run();
        const newId = r.meta.last_row_id;
        // 卡密商品：批量导入兑换码
        if (item_type === 'card' && Array.isArray(codes) && codes.length) {
          const now = Date.now();
          const uniq = [...new Set(codes.map(c => String(c).trim()).filter(Boolean))];
          for (const c of uniq) {
            await env.DB.prepare('INSERT INTO card_codes (item_id, code, created_at) VALUES (?,?,?)')
              .bind(newId, c, now).run().catch(()=>{});
          }
        }
        adminLog(env, me.id, '新增商品：' + name);
        return json({ ok: true, id: newId });
      }
      // PUT /api/admin/shop/items/:id 更新商品
      if (seg[0] === 'admin' && seg[1] === 'shop' && seg[2] === 'items' && seg.length === 4 && method === 'PUT') {
        const deny = requireAdmin(me); if (deny) return deny;
        const id = Number(seg[3]);
        const { name, descr, price, icon, sort, params, usage } = body;
        const sets = [], vals = [];
        if (name !== undefined) { sets.push('name=?'); vals.push(name); }
        if (descr !== undefined) { sets.push('descr=?'); vals.push(descr); }
        if (usage !== undefined) { sets.push('usage=?'); vals.push(usage); }
        if (price !== undefined) { sets.push('price=?'); vals.push(Math.max(1, Number(price) | 0)); }
        if (icon !== undefined) { sets.push('icon=?'); vals.push(icon); }
        if (sort !== undefined) { sets.push('sort=?'); vals.push(Number(sort) || 99); }
        if (params !== undefined) { sets.push('params=?'); vals.push(JSON.stringify(params)); }
        if (!sets.length) return json({ error: '无更新内容' }, 400);
        vals.push(id);
        await env.DB.prepare('UPDATE shop_items SET ' + sets.join(',') + ' WHERE id=?').bind(...vals).run();
        adminLog(env, me.id, '更新商品ID：' + id);
        return json({ ok: true });
      }
      // GET /api/admin/shop/items/:id/codes 查看卡密（管理员）
      if (seg[0] === 'admin' && seg[1] === 'shop' && seg[2] === 'items' && seg[4] === 'codes' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const id = Number(seg[3]);
        const { results } = await env.DB.prepare(
          'SELECT id, code, used_by, used_at FROM card_codes WHERE item_id=? ORDER BY id'
        ).bind(id).all();
        const stock = await env.DB.prepare(
          'SELECT COUNT(*) AS n FROM card_codes WHERE item_id=? AND used_by IS NULL'
        ).bind(id).first();
        return json({ codes: results, stock: stock.n });
      }
      // POST /api/admin/shop/items/:id/codes 补货卡密 {codes: []}
      if (seg[0] === 'admin' && seg[1] === 'shop' && seg[2] === 'items' && seg[4] === 'codes' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const id = Number(seg[3]);
        const { codes } = body;
        if (!Array.isArray(codes) || !codes.length) return json({ error: '请提供兑换码' }, 400);
        const now = Date.now();
        let added = 0;
        const uniq = [...new Set(codes.map(c => String(c).trim()).filter(Boolean))];
        for (const c of uniq) {
          const r = await env.DB.prepare('INSERT INTO card_codes (item_id, code, created_at) VALUES (?,?,?)')
            .bind(id, c, now).run().catch(()=>null);
          if (r) added++;
        }
        adminLog(env, me.id, '商品ID ' + id + ' 补货卡密 ' + added + ' 个');
        return json({ ok: true, added });
      }
      // DELETE /api/admin/shop/items/:id 删除商品
      if (seg[0] === 'admin' && seg[1] === 'shop' && seg[2] === 'items' && seg.length === 4 && method === 'DELETE') {
        const deny = requireAdmin(me); if (deny) return deny;
        await env.DB.prepare('DELETE FROM shop_items WHERE id=?').bind(Number(seg[3])).run();
        adminLog(env, me.id, '删除商品ID：' + seg[3]);
        return json({ ok: true });
      }
      if (seg[0] === 'admin' && seg[1] === 'friend-links' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const { results } = await env.DB.prepare('SELECT * FROM friend_links ORDER BY sort').all();
        return json({ links: results });
      }
      if (seg[0] === 'admin' && seg[1] === 'friend-links' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const name = String(body.name || '').trim().slice(0, 30);
        const url = String(body.url || '').trim().slice(0, 500);
        const descr = String(body.descr || '').trim().slice(0, 100);
        if (!name || !url) return json({ error: '参数不完整' }, 400);
        const r = await env.DB.prepare(
          'INSERT INTO friend_links (name, url, descr, sort, created_at) VALUES (?,?,?,?,?)'
        ).bind(name, url, descr || null, Number(body.sort)||99, Date.now()).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (seg[0] === 'admin' && seg[1] === 'friend-links' && seg.length === 3 && method === 'DELETE') {
        const deny = requireAdmin(me); if (deny) return deny;
        await env.DB.prepare('DELETE FROM friend_links WHERE id=?').bind(Number(seg[2])).run();
        return json({ ok: true });
      }
      // ---------- 个人资料设置 ----------
      if (seg[0] === 'me' && method === 'PUT') {
        if (!me) return json({ error: '请先登录' }, 401);
        const avatar_url = String(body.avatar_url || '').trim().slice(0, 500);
        const bio = String(body.bio || '').trim().slice(0, 200);
        if (avatar_url && !/^https?:\/\//.test(avatar_url)) return json({ error: '头像必须是 http(s) 链接' }, 400);
        const badBio = await checkSensitive(env, bio);
        if (badBio) return json({ error: '简介包含敏感词，请修改后重试' }, 400);
        await env.DB.prepare('UPDATE users SET avatar_url=?, bio=? WHERE id=?').bind(avatar_url, bio, me.id).run();
        return json({ ok: true });
      }
      if (seg[0] === 'me' && seg[1] === 'password' && method === 'PUT') {
        if (!me) return json({ error: '请先登录' }, 401);
        const oldPass = String(body.old_password || '');
        const newPass = String(body.new_password || '');
        const u = await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(me.id).first();
        // OAuth 用户（无密码）可直接设置密码，无需验证旧密码
        if (u.pass_hash !== 'oauth$' && !(await checkPass(oldPass, u))) return json({ error: '原密码错误' }, 400);
        if (newPass.length < 4 || newPass.length > 64) return json({ error: '新密码需 4-64 位' }, 400);
        const salt = randHex(16);
        const ph2 = await makePassHash(newPass);
        await env.DB.prepare('UPDATE users SET pass_hash=?, salt=? WHERE id=?').bind(ph2.hash, ph2.salt, me.id).run();
        return json({ ok: true });
      }
      if (seg[0] === 'me' && seg[1] === 'email' && method === 'PUT') {
        if (!me) return json({ error: '请先登录' }, 401);
        const email = String(body.email || '').trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: '邮箱格式不正确' }, 400);
        const ex = await env.DB.prepare('SELECT id FROM users WHERE email=? AND id<>?').bind(email, me.id).first();
        if (ex) return json({ error: '该邮箱已被使用' }, 400);
        await env.DB.prepare('UPDATE users SET email=?, verified=0 WHERE id=?').bind(email, me.id).run();
        // 换邮箱后重新发送验证邮件
        let mailSent = false;
        if (env.RESEND_API_KEY) {
          await env.DB.prepare('DELETE FROM verify_tokens WHERE user_id=?').bind(me.id).run();
          const token = randHex(32);
          await env.DB.prepare('INSERT INTO verify_tokens (token, user_id, created_at, expires_at) VALUES (?,?,?,?)')
            .bind(token, me.id, Date.now(), Date.now() + 24 * 3600 * 1000).run();
          const ms = await sendVerificationEmail(env, email, me.name, token, new URL(req.url).origin);
          mailSent = ms.sent;
        } else {
          await env.DB.prepare('UPDATE users SET verified=1 WHERE id=?').bind(me.id).run();
          mailSent = true;
        }
        return json({ ok: true, mailSent });
      }
      if (seg[0] === 'verify' && method === 'GET') {
        const token = url.searchParams.get('token') || '';
        const vt = await env.DB.prepare('SELECT * FROM verify_tokens WHERE token=?').bind(token).first();
        if (!vt || vt.expires_at < Date.now()) return json({ error: '链接无效或已过期，请重新发送验证邮件' }, 400);
        await env.DB.batch([
          env.DB.prepare('UPDATE users SET verified=1 WHERE id=?').bind(vt.user_id),
          env.DB.prepare('DELETE FROM verify_tokens WHERE user_id=?').bind(vt.user_id),
        ]);
        return json({ ok: true });
      }
      // ---------- 每日签到 ----------
      if (seg[0] === 'checkin' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const today = beijingDate();
        const existing = await env.DB.prepare('SELECT * FROM checkins WHERE user_id=? AND checkin_date=?').bind(me.id, today).first();
        if (existing) return json({ ok: true, already: true, streak: existing.streak, points: existing.points });
        // 计算连续签到（北京时间）
        const yesterday = beijingDate(Date.now() - 86400000);
        const lastCheckin = await env.DB.prepare('SELECT * FROM checkins WHERE user_id=? ORDER BY checkin_date DESC LIMIT 1').bind(me.id).first();
        let streak = 1;
        if (lastCheckin && lastCheckin.checkin_date === yesterday) {
          streak = lastCheckin.streak + 1;
        }
        // 积分：基础5 + 连续加成（每7天一个周期，最多+5）
        const bonus = Math.min(Math.floor((streak - 1) / 7) * 5 + ((streak - 1) % 7), 10);
        const points = 5 + bonus;
        const now = Date.now();
        await env.DB.prepare('INSERT INTO checkins (user_id, checkin_date, points, streak, created_at) VALUES (?,?,?,?,?)')
          .bind(me.id, today, points, streak, now).run();
        await env.DB.prepare('UPDATE users SET points = points + ?, checkin_streak = ?, last_checkin_date = ? WHERE id = ?')
          .bind(points, streak, today, me.id).run();
        await env.DB.prepare('INSERT INTO point_logs (user_id, points, reason, created_at) VALUES (?,?,?,?)')
          .bind(me.id, points, '每日签到', now).run().catch(()=>{});
        return json({ ok: true, streak, points, bonus });
      }

      // ---------- 签到状态 ----------
      if (seg[0] === 'checkin' && seg[1] === 'status' && method === 'GET') {
        if (!me) return json({ checked: false });
        const today = beijingDate();
        const existing = await env.DB.prepare('SELECT * FROM checkins WHERE user_id=? AND checkin_date=?').bind(me.id, today).first();
        const u = await env.DB.prepare('SELECT points, checkin_streak FROM users WHERE id=?').bind(me.id).first();
        return json({ checked: !!existing, streak: u.checkin_streak || 0, points: u.points || 0 });
      }

      // ---------- 答题积分领取 ----------
      if (seg[0] === 'quiz' && seg[1] === 'claim' && method === 'POST') {
        if (!me) return json({ ok: false, error: '请先登录' }, 401);
        const score = Math.max(0, Math.min(100, parseInt(body.score) || 0));
        const u = await env.DB.prepare('SELECT quiz_claimed, quiz_best_score FROM users WHERE id=?').bind(me.id).first();
        // 更新最高分
        if (score > (u.quiz_best_score || 0)) {
          await env.DB.prepare('UPDATE users SET quiz_best_score=? WHERE id=?').bind(score, me.id).run();
        }
        if (u.quiz_claimed) return json({ ok: true, already: true, points: 0 });
        // 首次完成：按分数给积分（60分以下+5，60-79 +10，80+ +15）
        const award = score >= 80 ? 15 : score >= 60 ? 10 : 5;
        await env.DB.prepare('UPDATE users SET quiz_claimed=1, points=points+? WHERE id=?').bind(award, me.id).run();
        await env.DB.prepare('INSERT INTO point_logs (user_id, points, reason, created_at) VALUES (?,?,?,?)')
          .bind(me.id, award, '段位测试', Date.now()).run().catch(()=>{});
        return json({ ok: true, points: award });
      }

      // ---------- 工具访问记录 ----------
      if (seg[0] === 'tool-visit' && method === 'POST') {
        let tool = String(body.tool || '').slice(0, 50);
        if (!tool) tool = String(url.searchParams.get('tool') || '').slice(0, 50);
        if (!tool) return json({ ok: false });
        await env.DB.prepare('INSERT INTO tool_visits (tool, user_id, created_at) VALUES (?,?,?)')
          .bind(tool, me ? me.id : null, Date.now()).run().catch(() => {});
        return json({ ok: true });
      }

      // ---------- 数据看板（管理员） ----------
      if (seg[0] === 'admin' && seg[1] === 'dashboard' && method === 'GET') {
        if (!me || !me.is_admin) return json({ error: '需要管理员权限' }, 403);
        const day = 86400000;
        const now = Date.now();
        const todayStart = new Date().setHours(0, 0, 0, 0);
        const weekStart = now - 7 * day;
        const stats = {};
        // 用户
        stats.totalUsers = (await env.DB.prepare('SELECT COUNT(*) AS n FROM users').first()).n;
        stats.todayUsers = (await env.DB.prepare('SELECT COUNT(*) AS n FROM users WHERE created_at >= ?').bind(todayStart).first()).n;
        stats.weekUsers = (await env.DB.prepare('SELECT COUNT(*) AS n FROM users WHERE created_at >= ?').bind(weekStart).first()).n;
        // 主题
        stats.totalThreads = (await env.DB.prepare('SELECT COUNT(*) AS n FROM threads').first()).n;
        stats.todayThreads = (await env.DB.prepare('SELECT COUNT(*) AS n FROM threads WHERE created_at >= ?').bind(todayStart).first()).n;
        stats.weekThreads = (await env.DB.prepare('SELECT COUNT(*) AS n FROM threads WHERE created_at >= ?').bind(weekStart).first()).n;
        // 回帖
        stats.totalPosts = (await env.DB.prepare('SELECT COUNT(*) AS n FROM posts').first()).n;
        stats.todayPosts = (await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE created_at >= ?').bind(todayStart).first()).n;
        stats.weekPosts = (await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE created_at >= ?').bind(weekStart).first()).n;
        // 签到
        stats.todayCheckins = (await env.DB.prepare('SELECT COUNT(*) AS n FROM checkins WHERE created_at >= ?').bind(todayStart).first()).n;
        stats.weekCheckins = (await env.DB.prepare('SELECT COUNT(*) AS n FROM checkins WHERE created_at >= ?').bind(weekStart).first()).n;
        // 工具访问（7天）
        const { results: toolStats } = await env.DB.prepare(
          'SELECT tool, COUNT(*) AS n FROM tool_visits WHERE created_at >= ? GROUP BY tool ORDER BY n DESC'
        ).bind(weekStart).all().catch(() => ({ results: [] }));
        stats.toolVisits = toolStats;
        // 7天趋势
        const trend = [];
        for (let i = 6; i >= 0; i--) {
          const dStart = new Date().setHours(0, 0, 0, 0) - i * day;
          const dEnd = dStart + day;
          const u = (await env.DB.prepare('SELECT COUNT(*) AS n FROM users WHERE created_at >= ? AND created_at < ?').bind(dStart, dEnd).first()).n;
          const t = (await env.DB.prepare('SELECT COUNT(*) AS n FROM threads WHERE created_at >= ? AND created_at < ?').bind(dStart, dEnd).first()).n;
          const p = (await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE created_at >= ? AND created_at < ?').bind(dStart, dEnd).first()).n;
          trend.push({ date: new Date(dStart).toISOString().slice(5, 10), users: u, threads: t, posts: p });
        }
        stats.trend = trend;
        // 积分排行 Top 10
        const { results: topUsers } = await env.DB.prepare(
          'SELECT id, name, points FROM users ORDER BY points DESC LIMIT 10'
        ).all().catch(() => ({ results: [] }));
        stats.topUsers = topUsers;
        return json(stats);
      }

      if (seg[0] === 'resend-verification' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        if (me.verified) return json({ ok: true, already: true });
        if (!env.RESEND_API_KEY) return json({ error: '邮件服务未配置，请联系管理员' }, 503);
        const recent = await env.DB.prepare('SELECT * FROM verify_tokens WHERE user_id=? AND created_at>?')
          .bind(me.id, Date.now() - 60 * 1000).first();
        if (recent) return json({ error: '发送太频繁，请 1 分钟后再试' }, 429);
        await env.DB.prepare('DELETE FROM verify_tokens WHERE user_id=?').bind(me.id).run();
        const token = randHex(32);
        await env.DB.prepare('INSERT INTO verify_tokens (token, user_id, created_at, expires_at) VALUES (?,?,?,?)')
          .bind(token, me.id, Date.now(), Date.now() + 24 * 3600 * 1000).run();
        const origin = new URL(req.url).origin;
        const ms = await sendVerificationEmail(env, me.email, me.name, token, origin);
        if (!ms.sent) return json({ error: '发送失败：' + ms.reason }, 502);
        return json({ ok: true });
      }

      // ---------- 公开统计 ----------
      if (seg[0] === 'stats' && method === 'GET') {
        const day = Date.now() - 86400 * 1000;
        const u = await env.DB.prepare('SELECT COUNT(*) AS n FROM users').first();
        const t = await env.DB.prepare('SELECT COUNT(*) AS n FROM threads').first();
        const p = await env.DB.prepare('SELECT COUNT(*) AS n FROM posts').first();
        const tt = await env.DB.prepare('SELECT COUNT(*) AS n FROM threads WHERE created_at>?').bind(day).first();
        const pt = await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE created_at>?').bind(day).first();
        const ut = await env.DB.prepare('SELECT COUNT(*) AS n FROM users WHERE created_at>?').bind(day).first();
        return json({ users: u.n, threads: t.n, posts: p.n, todayThreads: tt.n, todayPosts: pt.n, todayUsers: ut.n });
      }

      // ---------- 最新主题（跨版块） ----------
      if (seg[0] === 'threads' && seg[1] === 'latest' && method === 'GET') {
        const { results } = await env.DB.prepare(
          `SELECT t.*, u.name AS author, b.name AS board_name,
                  (SELECT u2.name FROM posts p2 JOIN users u2 ON u2.id=p2.user_id WHERE p2.thread_id=t.id ORDER BY p2.id DESC LIMIT 1) AS last_reply_by
           FROM threads t JOIN users u ON u.id=t.user_id JOIN boards b ON b.id=t.board_id
           ORDER BY (t.pinned=1 AND (t.pinned_until IS NULL OR t.pinned_until>?)) DESC, t.updated_at DESC LIMIT 20`
        ).bind(Date.now()).all();
        return json({ threads: results });
      }

      // ---------- 版块 ----------
      if (seg[0] === 'boards' && seg.length === 1 && method === 'GET') {
        const { results } = await env.DB.prepare(
          `SELECT b.*, (SELECT COUNT(*) FROM threads t WHERE t.board_id=b.id) AS thread_count,
                  (SELECT MAX(updated_at) FROM threads t WHERE t.board_id=b.id) AS last_active
           FROM boards b ORDER BY sort, id`
        ).all();
        return json({ boards: results });
      }
      if (seg[0] === 'boards' && seg.length === 1 && method === 'POST') {
        if (!me || !me.is_admin) return json({ error: '需要管理员权限' }, 403);
        const name = String(body.name || '').trim().slice(0, 30);
        const descr = String(body.descr || '').trim().slice(0, 100);
        if (!name) return json({ error: '版块名不能为空' }, 400);
        await env.DB.prepare('INSERT INTO boards (name, descr, sort) VALUES (?,?,?)').bind(name, descr, 99).run();
        return json({ ok: true });
      }

      // ---------- 主题 ----------
      if (seg[0] === 'boards' && seg[2] === 'threads' && method === 'GET') {
        const boardId = Number(seg[1]);
        const page = Math.max(1, Number(url.searchParams.get('page') || 1));
        const per = 20;
        const { results } = await env.DB.prepare(
          `SELECT t.*, u.name AS author,
                  (SELECT u2.name FROM posts p2 JOIN users u2 ON u2.id=p2.user_id WHERE p2.thread_id=t.id ORDER BY p2.id DESC LIMIT 1) AS last_reply_by
           FROM threads t JOIN users u ON u.id=t.user_id
           WHERE t.board_id=? ORDER BY (t.pinned=1 AND (t.pinned_until IS NULL OR t.pinned_until>?)) DESC, t.updated_at DESC LIMIT ? OFFSET ?`
        ).bind(boardId, Date.now(), per, (page - 1) * per).all();
        const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM threads WHERE board_id=?').bind(boardId).first();
        const b = await env.DB.prepare('SELECT * FROM boards WHERE id=?').bind(boardId).first();
        return json({ board: b, threads: results, total: c.n, page, per });
      }
      if (seg[0] === 'threads' && seg.length === 1 && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        if (me.banned) return json({ error: '你已被禁言，请联系管理员' }, 403);
        if (!me.verified) return json({ error: '请先验证邮箱后再发帖', needVerify: true }, 403);
        if (!await checkRateLimit(env, 'thread:' + me.id, 5, 3600 * 1000)) {
          return json({ error: '发帖太频繁，请稍后再试' }, 429);
        }
        const boardId = Number(body.board_id);
        const title = String(body.title || '').trim().slice(0, 100);
        const content = String(body.content || '').trim().slice(0, 10000);
        if (!boardId || !title) return json({ error: '标题不能为空' }, 400);
        if (!content) return json({ error: '内容不能为空' }, 400);
        const badWord = await checkSensitive(env, title + '\n' + content);
        if (badWord) return json({ error: '内容包含敏感词，请修改后重试' }, 400);
        const now = Date.now();
        const r = await env.DB.prepare(
          'INSERT INTO threads (board_id, user_id, title, created_at, updated_at) VALUES (?,?,?,?,?)'
        ).bind(boardId, me.id, title, now, now).run();
        const tid = r.meta.last_row_id;
        await env.DB.prepare('INSERT INTO posts (thread_id, user_id, content, created_at) VALUES (?,?,?,?)')
          .bind(tid, me.id, content, now).run();
        await env.DB.prepare('INSERT INTO threads_fts (title, content, thread_id) VALUES (?,?,?)')
          .bind(title, content.slice(0, 500), tid).run().catch(() => {});
        await notifyMentions(env, title + ' ' + content, me.id, tid, null);
        await addPoints(env, me.id, 5, '发帖', tid);
        return json({ ok: true, id: tid });
      }
      if (seg[0] === 'threads' && seg.length === 2 && method === 'GET') {
        const tid = Number(seg[1]);
        const t = await env.DB.prepare(
          `SELECT t.*, u.name AS author, u.avatar_url AS author_avatar, u.custom_title AS author_title, u.avatar_frame AS author_frame, b.name AS board_name FROM threads t
           JOIN users u ON u.id=t.user_id JOIN boards b ON b.id=t.board_id WHERE t.id=?`
        ).bind(tid).first();
        if (!t) return json({ error: '主题不存在' }, 404);
        await env.DB.prepare('UPDATE threads SET views=views+1 WHERE id=?').bind(tid).run().catch(()=>{});
        t.views = (t.views || 0) + 1;
        const page = Math.max(1, Number(url.searchParams.get('page') || 1));
        const per = 20;
        const authorOnly = url.searchParams.get('author_only') === '1';
        const orderDesc = url.searchParams.get('order') === 'desc';
        const orderSql = orderDesc ? 'p.id DESC' : 'p.id';
        const whereExtra = authorOnly ? ' AND p.user_id=' + t.user_id : '';
        const { results } = await env.DB.prepare(
          `SELECT p.*, u.name AS author, u.avatar_url, u.custom_title, u.avatar_frame,
                  (SELECT COUNT(*) FROM likes l WHERE l.post_id=p.id) AS like_count
           FROM posts p JOIN users u ON u.id=p.user_id
           WHERE p.thread_id=?${whereExtra} ORDER BY ${orderSql} LIMIT ? OFFSET ?`
        ).bind(tid, per, (page - 1) * per).all();
        let likedSet = new Set();
        if (me && results.length) {
          const { results: liked } = await env.DB.prepare(
            `SELECT post_id FROM likes WHERE user_id=? AND post_id IN (${results.map(() => '?').join(',')})`
          ).bind(me.id, ...results.map(p => p.id)).all();
          likedSet = new Set(liked.map(l => l.post_id));
        }
        results.forEach(p => { p.liked_by_me = likedSet.has(p.id); });
        // 权限内容块处理
        let hasReplied = false, userScore = 0;
        if (me) {
          const hr = await env.DB.prepare('SELECT 1 FROM posts WHERE thread_id=? AND user_id=? LIMIT 1').bind(tid, me.id).first();
          hasReplied = !!hr;
          const tc = await env.DB.prepare('SELECT COUNT(*) AS n FROM threads WHERE user_id=?').bind(me.id).first();
          const pc = await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE user_id=?').bind(me.id).first();
          userScore = tc.n + pc.n;
        }
        results.forEach(p => {
          p.content = processContentBlocks(p.content, {
            isAuthor: me && p.user_id === me.id,
            isAdmin: me && me.is_admin,
            hasReplied,
            userScore,
          });
        });
        const pc = await env.DB.prepare(`SELECT COUNT(*) AS n FROM posts WHERE thread_id=?${authorOnly ? ' AND user_id=' + t.user_id : ''}`).bind(tid).first();
        const totalAll = authorOnly ? (await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE thread_id=?').bind(tid).first()).n : pc.n;
        let favorited = false;
        if (me) {
          const f = await env.DB.prepare('SELECT 1 FROM favorites WHERE user_id=? AND thread_id=?').bind(me.id, tid).first();
          favorited = !!f;
        }
        return json({ thread: t, posts: results, total: pc.n, totalAll, page, per, favorited, authorOnly, orderDesc,
          me: me ? { id: me.id, is_admin: me.is_admin } : null });
      }
      if (seg[0] === 'threads' && seg.length === 2 && method === 'DELETE') {
        const tid = Number(seg[1]);
        const t = await env.DB.prepare('SELECT * FROM threads WHERE id=?').bind(tid).first();
        if (!t) return json({ error: '主题不存在' }, 404);
        if (!me || (!me.is_admin && t.user_id !== me.id)) return json({ error: '无权限' }, 403);
        await env.DB.batch([
          env.DB.prepare('DELETE FROM likes WHERE post_id IN (SELECT id FROM posts WHERE thread_id=?)').bind(tid),
          env.DB.prepare('DELETE FROM notifications WHERE thread_id=?').bind(tid),
          env.DB.prepare('DELETE FROM reports WHERE thread_id=?').bind(tid),
          env.DB.prepare('DELETE FROM posts WHERE thread_id=?').bind(tid),
          env.DB.prepare('DELETE FROM threads WHERE id=?').bind(tid),
          env.DB.prepare('DELETE FROM threads_fts WHERE thread_id=?').bind(tid),
          env.DB.prepare('DELETE FROM favorites WHERE thread_id=?').bind(tid),
        ]);
        return json({ ok: true });
      }
      if (seg[0] === 'threads' && seg[2] === 'pin' && method === 'POST') {
        if (!me || !me.is_admin) return json({ error: '需要管理员权限' }, 403);
        const tid = Number(seg[1]);
        const pinned = body.pinned ? 1 : 0;
        await env.DB.prepare('UPDATE threads SET pinned=? WHERE id=?').bind(pinned, tid).run();
        return json({ ok: true });
      }

      // ---------- 回帖 ----------
      if (seg[0] === 'posts' && seg.length === 1 && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        if (me.banned) return json({ error: '你已被禁言，请联系管理员' }, 403);
        if (!me.verified) return json({ error: '请先验证邮箱后再回帖', needVerify: true }, 403);
        if (!await checkRateLimit(env, 'post:' + me.id, 30, 3600 * 1000)) {
          return json({ error: '回帖太频繁，请稍后再试' }, 429);
        }
        const tid = Number(body.thread_id);
        const content = String(body.content || '').trim().slice(0, 10000);
        if (!tid || !content) return json({ error: '内容不能为空' }, 400);
        const badWord = await checkSensitive(env, content);
        if (badWord) return json({ error: '内容包含敏感词，请修改后重试' }, 400);
        const t = await env.DB.prepare('SELECT id, user_id, is_locked FROM threads WHERE id=?').bind(tid).first();
        if (!t) return json({ error: '主题不存在' }, 404);
        if (t.is_locked && !me.is_admin) return json({ error: '该主题已被锁定，无法回复' }, 403);
        const now = Date.now();
        const pr = await env.DB.prepare('INSERT INTO posts (thread_id, user_id, content, created_at) VALUES (?,?,?,?)')
          .bind(tid, me.id, content, now).run();
        await env.DB.prepare('UPDATE threads SET updated_at=?, reply_count=reply_count+1 WHERE id=?').bind(now, tid).run();
        await notifyMentions(env, content, me.id, tid, pr.meta.last_row_id);
        // 通知楼主有人回帖（排除自己回自己；若已@楼主则不重复通知）
        if (t.user_id !== me.id) {
          const mentioned = parseMentions(content);
          const author = await env.DB.prepare('SELECT name FROM users WHERE id=?').bind(t.user_id).first();
          if (!author || !mentioned.includes(author.name)) {
            await env.DB.prepare(
              'INSERT INTO notifications (user_id, type, from_user_id, thread_id, post_id, created_at) VALUES (?,?,?,?,?,?)'
            ).bind(t.user_id, 'reply', me.id, tid, pr.meta.last_row_id, now).run();
          }
        }
        await addPoints(env, me.id, 2, '回帖', tid);
        return json({ ok: true });
      }
      if (seg[0] === 'posts' && seg.length === 2 && method === 'PUT') {
        if (!me) return json({ error: '请先登录' }, 401);
        if (me.banned) return json({ error: '你已被禁言，请联系管理员' }, 403);
        const pid = Number(seg[1]);
        const p = await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(pid).first();
        if (!p) return json({ error: '回帖不存在' }, 404);
        if (!me.is_admin && p.user_id !== me.id) return json({ error: '无权限' }, 403);
        const content = String(body.content || '').trim().slice(0, 10000);
        if (!content) return json({ error: '内容不能为空' }, 400);
        await env.DB.prepare('UPDATE posts SET content=?, updated_at=? WHERE id=?').bind(content, Date.now(), pid).run();
        // 首帖编辑 → 同步搜索索引
        const isFirst = await env.DB.prepare('SELECT id FROM posts WHERE thread_id=? ORDER BY id LIMIT 1').bind(p.thread_id).first();
        if (isFirst && isFirst.id === pid) {
          const t = await env.DB.prepare('SELECT title FROM threads WHERE id=?').bind(p.thread_id).first();
          if (t) await env.DB.prepare('UPDATE threads_fts SET title=?, content=? WHERE thread_id=?').bind(t.title, content, p.thread_id).run();
        }
        return json({ ok: true });
      }
      if (seg[0] === 'posts' && seg.length === 2 && method === 'DELETE') {
        const pid = Number(seg[1]);
        const p = await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(pid).first();
        if (!p) return json({ error: '回帖不存在' }, 404);
        if (!me || (!me.is_admin && p.user_id !== me.id)) return json({ error: '无权限' }, 403);
        const first = await env.DB.prepare('SELECT id FROM posts WHERE thread_id=? ORDER BY id LIMIT 1').bind(p.thread_id).first();
        await env.DB.prepare('DELETE FROM posts WHERE id=?').bind(pid).run();
        if (first && first.id === pid) {
          // 删的是首帖 → 整个主题删除
          await env.DB.batch([
            env.DB.prepare('DELETE FROM likes WHERE post_id IN (SELECT id FROM posts WHERE thread_id=?)').bind(p.thread_id),
            env.DB.prepare('DELETE FROM notifications WHERE thread_id=?').bind(p.thread_id),
            env.DB.prepare('DELETE FROM reports WHERE thread_id=?').bind(p.thread_id),
            env.DB.prepare('DELETE FROM posts WHERE thread_id=?').bind(p.thread_id),
            env.DB.prepare('DELETE FROM threads WHERE id=?').bind(p.thread_id),
            env.DB.prepare('DELETE FROM threads_fts WHERE thread_id=?').bind(p.thread_id),
            env.DB.prepare('DELETE FROM favorites WHERE thread_id=?').bind(p.thread_id),
          ]);
          return json({ ok: true, threadDeleted: true });
        }
        await env.DB.prepare('UPDATE threads SET reply_count=MAX(0,reply_count-1) WHERE id=?').bind(p.thread_id).run();
        return json({ ok: true });
      }

      // ---------- 搜索 ----------
      if (seg[0] === 'search' && method === 'GET') {
        const q = String(url.searchParams.get('q') || '').trim().slice(0, 50);
        if (!q) return json({ results: [] });
        const hasChinese = /[\u4e00-\u9fff]/.test(q);
        let results = [];
        if (hasChinese) {
          // 中文用 LIKE 模糊搜索（FTS5 默认分词器切不动中文）
          const like = '%' + q.replace(/[%_]/g, '') + '%';
          const r = await env.DB.prepare(
            `SELECT t.id, t.title, t.user_id, t.reply_count, t.updated_at, t.is_locked, u.name AS author, b.name AS board_name
             FROM threads t JOIN users u ON u.id=t.user_id JOIN boards b ON b.id=t.board_id
             WHERE t.title LIKE ? OR t.id IN (SELECT thread_id FROM posts WHERE content LIKE ?)
             ORDER BY t.updated_at DESC LIMIT 20`
          ).bind(like, like).all().catch(() => ({ results: [] }));
          results = r.results;
        } else {
          const ftsq = sanitizeFts(q);
          if (ftsq) {
            const r = await env.DB.prepare(
              `SELECT t.id, t.title, t.user_id, t.reply_count, t.updated_at, t.is_locked, u.name AS author, b.name AS board_name
               FROM threads_fts f JOIN threads t ON t.id=f.thread_id
               JOIN users u ON u.id=t.user_id JOIN boards b ON b.id=t.board_id
               WHERE threads_fts MATCH ? ORDER BY rank LIMIT 20`
            ).bind(ftsq).all().catch(() => ({ results: [] }));
            results = r.results;
          }
          // FTS 无结果时回退到 LIKE（支持前缀/模糊）
          if (!results.length) {
            const like = '%' + q.replace(/[%_]/g, '') + '%';
            const r2 = await env.DB.prepare(
              `SELECT t.id, t.title, t.user_id, t.reply_count, t.updated_at, t.is_locked, u.name AS author, b.name AS board_name
               FROM threads t JOIN users u ON u.id=t.user_id JOIN boards b ON b.id=t.board_id
               WHERE t.title LIKE ? OR t.id IN (SELECT thread_id FROM posts WHERE content LIKE ?)
               ORDER BY t.updated_at DESC LIMIT 20`
            ).bind(like, like).all().catch(() => ({ results: [] }));
            results = r2.results;
          }
        }
        return json({ results });
      }

      // ---------- 图片外链说明 ----------
      // 图片使用外链：用户在内容中粘贴图片 URL，前端 renderContent 渲染为 <img>

      // ---------- 通知 ----------
      if (seg[0] === 'notifications' && method === 'GET') {
        if (!me) return json({ error: '请先登录' }, 401);
        const { results } = await env.DB.prepare(
          `SELECT n.*, u.name AS from_name, t.title AS thread_title FROM notifications n
           JOIN users u ON u.id=n.from_user_id JOIN threads t ON t.id=n.thread_id
           WHERE n.user_id=? ORDER BY n.created_at DESC LIMIT 30`
        ).bind(me.id).all();
        const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM notifications WHERE user_id=? AND is_read=0').bind(me.id).first();
        return json({ notifications: results, unread: c.n });
      }
      if (seg[0] === 'notifications' && seg[1] === 'read' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        await env.DB.prepare('UPDATE notifications SET is_read=1 WHERE user_id=?').bind(me.id).run();
        return json({ ok: true });
      }

      // ---------- 定位回帖所在页 ----------
      if (seg[0] === 'posts' && seg[2] === 'locate' && method === 'GET') {
        const pid = Number(seg[1]);
        const p = await env.DB.prepare('SELECT thread_id FROM posts WHERE id=?').bind(pid).first();
        if (!p) return json({ error: '回帖不存在' }, 404);
        const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE thread_id=? AND id<?').bind(p.thread_id, pid).first();
        const per = 20;
        const page = Math.floor(c.n / per) + 1;
        return json({ thread_id: p.thread_id, page, floor: c.n + 1 });
      }

      // ---------- 点赞 ----------
      if (seg[0] === 'posts' && seg[2] === 'like' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const pid = Number(seg[1]);
        const p = await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(pid).first();
        if (!p) return json({ error: '回帖不存在' }, 404);
        const ex = await env.DB.prepare('SELECT * FROM likes WHERE post_id=? AND user_id=?').bind(pid, me.id).first();
        if (ex) {
          await env.DB.prepare('DELETE FROM likes WHERE post_id=? AND user_id=?').bind(pid, me.id).run();
          // 取消点赞扣回 1 分（防刷）
          if (p.user_id !== me.id) await addPoints(env, p.user_id, -1, '取消点赞', pid);
        } else {
          await env.DB.prepare('INSERT INTO likes (post_id, user_id, created_at) VALUES (?,?,?)').bind(pid, me.id, Date.now()).run();
          // 被点赞者 +1（不给自己点赞加分）
          if (p.user_id !== me.id) await addPoints(env, p.user_id, 1, '被点赞', pid);
        }
        const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM likes WHERE post_id=?').bind(pid).first();
        return json({ ok: true, liked: !ex, count: c.n });
      }

      // ---------- 标记为解决方案 ----------
      if (seg[0] === 'posts' && seg[2] === 'solution' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const pid = Number(seg[1]);
        const p = await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(pid).first();
        if (!p) return json({ error: '回帖不存在' }, 404);
        const t = await env.DB.prepare('SELECT * FROM threads WHERE id=?').bind(p.thread_id).first();
        // 只有楼主和管理员可以标记
        if (t.user_id !== me.id && !me.is_admin) return json({ error: '只有楼主可以标记解决方案' }, 403);
        // 如果已经是解决方案，不重复加分
        if (p.is_solution === 1) return json({ ok: true, already: true });
        // 找到旧方案，扣回它的 20 分
        const oldSol = await env.DB.prepare('SELECT * FROM posts WHERE thread_id=? AND is_solution=1').bind(p.thread_id).first();
        if (oldSol) await addPoints(env, oldSol.user_id, -20, '解决方案被替换', oldSol.id);
        // 取消该主题下其他方案标记（只保留一个）
        await env.DB.prepare('UPDATE posts SET is_solution=0 WHERE thread_id=?').bind(p.thread_id).run();
        await env.DB.prepare('UPDATE posts SET is_solution=1 WHERE id=?').bind(pid).run();
        await logAdmin(env, me.id, 'mark_solution', `标记回帖 #${pid} 为解决方案（主题 #${p.thread_id}）`);
        await addPoints(env, p.user_id, 20, '回帖被采纳', pid);
        return json({ ok: true });
      }

      // ---------- 取消解决方案标记 ----------
      if (seg[0] === 'posts' && seg[2] === 'unsolution' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const pid = Number(seg[1]);
        const p = await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(pid).first();
        if (!p) return json({ error: '回帖不存在' }, 404);
        const t = await env.DB.prepare('SELECT * FROM threads WHERE id=?').bind(p.thread_id).first();
        if (t.user_id !== me.id && !me.is_admin) return json({ error: '只有楼主可以操作' }, 403);
        await env.DB.prepare('UPDATE posts SET is_solution=0 WHERE id=?').bind(pid).run();
        // 取消时扣回 20 分
        if (p.is_solution === 1) await addPoints(env, p.user_id, -20, '取消解决方案', pid);
        return json({ ok: true });
      }

      // ---------- 用户搜索（@补全） ----------
      if (seg[0] === 'users' && seg[1] === 'search' && method === 'GET') {
        const q = String(url.searchParams.get('q') || '').trim().slice(0, 16);
        if (!q) return json({ users: [] });
        const { results } = await env.DB.prepare(
          'SELECT id, name, avatar_url FROM users WHERE name LIKE ? LIMIT 8'
        ).bind('%' + q + '%').all();
        return json({ users: results });
      }

      // ---------- 个人主页 ----------
      if (seg[0] === 'users' && seg.length === 2 && method === 'GET') {
        const uid = Number(seg[1]);
        const u = await env.DB.prepare('SELECT id, name, is_admin, avatar_url, bio, created_at, points, checkin_streak, custom_title, avatar_frame FROM users WHERE id=?').bind(uid).first();
        if (!u) return json({ error: '用户不存在' }, 404);
        const { results: threads } = await env.DB.prepare(
          `SELECT t.*, b.name AS board_name FROM threads t JOIN boards b ON b.id=t.board_id
           WHERE t.user_id=? ORDER BY t.created_at DESC LIMIT 20`
        ).bind(uid).all();
        const pc = await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE user_id=?').bind(uid).first();
        return json({ user: u, threads, postCount: pc.n });
      }

      if (seg[0] === 'threads' && seg[2] === 'favorite' && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const tid = Number(seg[1]);
        const ex = await env.DB.prepare('SELECT 1 FROM favorites WHERE user_id=? AND thread_id=?').bind(me.id, tid).first();
        if (ex) {
          await env.DB.prepare('DELETE FROM favorites WHERE user_id=? AND thread_id=?').bind(me.id, tid).run();
        } else {
          await env.DB.prepare('INSERT INTO favorites (user_id, thread_id, created_at) VALUES (?,?,?)').bind(me.id, tid, Date.now()).run();
        }
        return json({ ok: true, favorited: !ex });
      }
      if (seg[0] === 'me' && seg[1] === 'favorites' && method === 'GET') {
        if (!me) return json({ error: '请先登录' }, 401);
        const { results } = await env.DB.prepare(
          `SELECT t.*, u.name AS author, b.name AS board_name FROM favorites f
           JOIN threads t ON t.id=f.thread_id JOIN users u ON u.id=t.user_id JOIN boards b ON b.id=t.board_id
           WHERE f.user_id=? ORDER BY f.created_at DESC LIMIT 50`
        ).bind(me.id).all();
        return json({ favorites: results });
      }

      // ---------- 站点设置 ----------
      if (seg[0] === 'settings' && method === 'GET') {
        const { results } = await env.DB.prepare('SELECT key, value FROM settings').all();
        const s = {};
        results.forEach(r => { s[r.key] = r.value; });
        if (env.TURNSTILE_SITE_KEY || env.TURNSTILE_SITEKEY) s.turnstile_sitekey = env.TURNSTILE_SITE_KEY || env.TURNSTILE_SITEKEY;
        else s.turnstile_sitekey = '0x4AAAAAAFx-tDpY_E09MUwg'; // 公开 sitekey，直接内置防变量丢失
        s.github_oauth = env.GITHUB_CLIENT_ID ? 1 : 0;
        return json({ settings: s });
      }
      if (seg[0] === 'admin' && seg[1] === 'settings' && method === 'PUT') {
        const deny = requireAdmin(me); if (deny) return deny;
        const allowed = ['site_name', 'site_logo', 'site_desc', 'announcement', 'ai_digest_enabled'];
        const batch = [];
        for (const k of allowed) {
          if (body[k] !== undefined) {
            const v = String(body[k]).slice(0, k === 'announcement' ? 500 : 100);
            batch.push(env.DB.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?,?)').bind(k, v));
          }
        }
        if (batch.length) await env.DB.batch(batch);
        return json({ ok: true });
      }

      // ---------- AI 每日精选（管理） ----------
      // POST /api/admin/ai-digest/run 手动触发一轮（force：忽略总开关，每日限额仍生效）
      if (seg[0] === 'admin' && seg[1] === 'ai-digest' && seg[2] === 'run' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const r = await runAiDigest(env, { force: true });
        await adminLog(env, me, '手动触发 AI 精选', 'ai_digest', null, '发帖 ' + (r.posted || 0) + ' 篇');
        return json({ ok: true, ...r });
      }
      // GET /api/admin/ai-digest/status 开关状态 + 最近抓取记录 + 状态统计
      if (seg[0] === 'admin' && seg[1] === 'ai-digest' && seg[2] === 'status' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const { results: recent } = await env.DB.prepare(
          'SELECT id, source, source_url, title, score, status, post_id, created_at FROM ai_ingest ORDER BY id DESC LIMIT 20'
        ).all().catch(() => ({ results: [] }));
        const { results: counts } = await env.DB.prepare(
          'SELECT status, COUNT(*) AS n FROM ai_ingest GROUP BY status'
        ).all().catch(() => ({ results: [] }));
        const en = await getSetting(env, 'ai_digest_enabled', '1');
        return json({ enabled: en !== '0', recent, counts });
      }

      // ---------- 私信 ----------
      if (seg[0] === 'dm' && seg.length === 1 && method === 'GET') {
        if (!me) return json({ error: '请先登录' }, 401);
        const { results } = await env.DB.prepare(
          `SELECT
             CASE WHEN sender_id=? THEN receiver_id ELSE sender_id END AS uid,
             MAX(created_at) AS last_at,
             SUM(CASE WHEN receiver_id=? AND is_read=0 THEN 1 ELSE 0 END) AS unread
           FROM dm_messages WHERE sender_id=? OR receiver_id=?
           GROUP BY uid ORDER BY last_at DESC LIMIT 30`
        ).bind(me.id, me.id, me.id, me.id).all();
        // 每个会话的最后一条消息（避免在子查询中引用 uid 别名）
        for (const r of results) {
          const lm = await env.DB.prepare(
            `SELECT content FROM dm_messages
             WHERE (sender_id=? AND receiver_id=?) OR (sender_id=? AND receiver_id=?)
             ORDER BY created_at DESC LIMIT 1`
          ).bind(me.id, r.uid, r.uid, me.id).first();
          r.last_msg = lm ? lm.content : '';
        }
        const uids = results.map(r => r.uid);
        let names = {};
        if (uids.length) {
          const { results: us } = await env.DB.prepare(
            `SELECT id, name, avatar_url FROM users WHERE id IN (${uids.map(()=>'?').join(',')})`
          ).bind(...uids).all();
          us.forEach(u => { names[u.id] = u; });
        }
        results.forEach(r => { r.user = names[r.uid] || { id: r.uid, name: '未知', avatar_url: '' }; });
        const total = await env.DB.prepare('SELECT COUNT(*) AS n FROM dm_messages WHERE receiver_id=? AND is_read=0').bind(me.id).first();
        return json({ conversations: results, totalUnread: total.n });
      }
      if (seg[0] === 'dm' && seg.length === 2 && method === 'GET') {
        if (!me) return json({ error: '请先登录' }, 401);
        const uid = Number(seg[1]);
        if (uid === me.id) return json({ error: '不能给自己发私信' }, 400);
        const other = await env.DB.prepare('SELECT id, name, avatar_url FROM users WHERE id=?').bind(uid).first();
        if (!other) return json({ error: '用户不存在' }, 404);
        const { results } = await env.DB.prepare(
          `SELECT * FROM dm_messages WHERE (sender_id=? AND receiver_id=?) OR (sender_id=? AND receiver_id=?)
           ORDER BY created_at DESC LIMIT 50`
        ).bind(me.id, uid, uid, me.id).all();
        results.reverse();
        await env.DB.prepare('UPDATE dm_messages SET is_read=1 WHERE sender_id=? AND receiver_id=?').bind(uid, me.id).run();
        return json({ user: other, messages: results });
      }
      if (seg[0] === 'dm' && seg.length === 2 && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        if (me.banned) return json({ error: '你已被禁言' }, 403);
        if (!me.verified) return json({ error: '请先验证邮箱后再发私信', needVerify: true }, 403);
        if (!await checkRateLimit(env, 'dm:' + me.id, 30, 3600 * 1000)) {
          return json({ error: '发送太频繁，请稍后再试' }, 429);
        }
        const uid = Number(seg[1]);
        if (uid === me.id) return json({ error: '不能给自己发私信' }, 400);
        const other = await env.DB.prepare('SELECT id FROM users WHERE id=?').bind(uid).first();
        if (!other) return json({ error: '用户不存在' }, 404);
        const content = String(body.content || '').trim().slice(0, 2000);
        if (!content) return json({ error: '内容不能为空' }, 400);
        const badWord = await checkSensitive(env, content);
        if (badWord) return json({ error: '内容包含敏感词，请修改后重试' }, 400);
        await env.DB.prepare(
          'INSERT INTO dm_messages (sender_id, receiver_id, content, created_at) VALUES (?,?,?,?)'
        ).bind(me.id, uid, content, Date.now()).run();
        return json({ ok: true });
      }

      // ---------- 举报 ----------
      if (seg[0] === 'reports' && seg.length === 1 && method === 'POST') {
        if (!me) return json({ error: '请先登录' }, 401);
        const target_type = String(body.target_type || '');
        const target_id = Number(body.target_id);
        const reason = String(body.reason || '').trim().slice(0, 200);
        if (!['thread', 'post'].includes(target_type) || !target_id) return json({ error: '参数错误' }, 400);
        if (!reason) return json({ error: '请填写举报理由' }, 400);
        let thread_id = 0;
        if (target_type === 'thread') {
          const t = await env.DB.prepare('SELECT id FROM threads WHERE id=?').bind(target_id).first();
          if (!t) return json({ error: '主题不存在' }, 404);
          thread_id = target_id;
        } else {
          const p = await env.DB.prepare('SELECT thread_id FROM posts WHERE id=?').bind(target_id).first();
          if (!p) return json({ error: '回帖不存在' }, 404);
          thread_id = p.thread_id;
        }
        const dup = await env.DB.prepare(
          'SELECT id FROM reports WHERE reporter_id=? AND target_type=? AND target_id=? AND status=?'
        ).bind(me.id, target_type, target_id, 'pending').first();
        if (dup) return json({ error: '你已经举报过，等待处理中' }, 400);
        await env.DB.prepare(
          'INSERT INTO reports (reporter_id, target_type, target_id, thread_id, reason, created_at) VALUES (?,?,?,?,?,?)'
        ).bind(me.id, target_type, target_id, thread_id, reason, Date.now()).run();
        return json({ ok: true });
      }
      if (seg[0] === 'admin' && seg[1] === 'reports' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const status = url.searchParams.get('status') || 'pending';
        const { results } = await env.DB.prepare(
          `SELECT r.*, u.name AS reporter_name, t.title AS thread_title FROM reports r
           JOIN users u ON u.id=r.reporter_id JOIN threads t ON t.id=r.thread_id
           WHERE r.status=? ORDER BY r.created_at DESC LIMIT 50`
        ).bind(status).all();
        const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM reports WHERE status='pending'").first();
        return json({ reports: results, pendingCount: c.n });
      }
      if (seg[0] === 'admin' && seg[1] === 'reports' && seg[3] === 'handle' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const rid = Number(seg[2]);
        const action = String(body.action || '');
        if (!['dismiss', 'delete'].includes(action)) return json({ error: '参数错误' }, 400);
        const r = await env.DB.prepare('SELECT * FROM reports WHERE id=?').bind(rid).first();
        if (!r) return json({ error: '举报不存在' }, 404);
        if (action === 'delete') {
          if (r.target_type === 'thread') {
            await env.DB.batch([
              env.DB.prepare('DELETE FROM posts WHERE thread_id=?').bind(r.target_id),
              env.DB.prepare('DELETE FROM threads WHERE id=?').bind(r.target_id),
              env.DB.prepare('DELETE FROM threads_fts WHERE thread_id=?').bind(r.target_id),
              env.DB.prepare('DELETE FROM favorites WHERE thread_id=?').bind(r.target_id),
              env.DB.prepare("UPDATE reports SET status='deleted', handled_at=? WHERE thread_id=? AND status='pending'").bind(Date.now(), r.target_id),
            ]);
          } else {
            const p = await env.DB.prepare('SELECT thread_id FROM posts WHERE id=?').bind(r.target_id).first();
            await env.DB.batch([
              env.DB.prepare('DELETE FROM likes WHERE post_id=?').bind(r.target_id),
              env.DB.prepare('DELETE FROM notifications WHERE post_id=?').bind(r.target_id),
              env.DB.prepare('DELETE FROM posts WHERE id=?').bind(r.target_id),
              env.DB.prepare("UPDATE reports SET status='deleted', handled_at=? WHERE target_type='post' AND target_id=? AND status='pending'").bind(Date.now(), r.target_id),
            ]);
            if (p) await env.DB.prepare('UPDATE threads SET reply_count=MAX(0,reply_count-1) WHERE id=?').bind(p.thread_id).run();
          }
        }
        await env.DB.prepare("UPDATE reports SET status=?, handled_at=? WHERE id=?")
          .bind(action === 'delete' ? 'deleted' : 'dismissed', Date.now(), rid).run();
        await adminLog(env, me, action === 'delete' ? '举报处理-删除内容' : '举报处理-驳回', r.target_type, r.target_id, '举报#' + rid);
        return json({ ok: true });
      }

      // ---------- 精华 ----------
      if (seg[0] === 'threads' && seg[2] === 'digest' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const tid = Number(seg[1]);
        await env.DB.prepare('UPDATE threads SET is_digest=? WHERE id=?').bind(body.digest ? 1 : 0, tid).run();
        return json({ ok: true });
      }

      // ---------- 锁定 / 解锁 ----------
      if (seg[0] === 'threads' && seg[2] === 'lock' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const tid = Number(seg[1]);
        await env.DB.prepare('UPDATE threads SET is_locked=? WHERE id=?').bind(body.locked ? 1 : 0, tid).run();
        return json({ ok: true });
      }

      // ---------- 敏感词管理 ----------
      if (seg[0] === 'admin' && seg[1] === 'sensitive-words' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const { results } = await env.DB.prepare('SELECT word FROM sensitive_words ORDER BY word').all();
        return json({ words: results.map(r => r.word) });
      }
      if (seg[0] === 'admin' && seg[1] === 'sensitive-words' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const word = String(body.word || '').trim().slice(0, 20);
        if (!word) return json({ error: '词不能为空' }, 400);
        await env.DB.prepare('INSERT OR IGNORE INTO sensitive_words (word, created_at) VALUES (?,?)').bind(word, Date.now()).run();
        sensitiveCache = null;
        return json({ ok: true });
      }
      if (seg[0] === 'admin' && seg[1] === 'sensitive-words' && seg.length === 3 && method === 'DELETE') {
        const deny = requireAdmin(me); if (deny) return deny;
        const word = decodeURIComponent(seg[2]);
        await env.DB.prepare('DELETE FROM sensitive_words WHERE word=?').bind(word).run();
        sensitiveCache = null;
        return json({ ok: true });
      }

      // ---------- 管理后台 ----------
      if (seg[0] === 'admin' && seg[1] === 'logs' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const page = Math.max(1, Number(url.searchParams.get('p') || 1));
        const per = 30;
        const { results } = await env.DB.prepare(
          'SELECT * FROM admin_logs ORDER BY id DESC LIMIT ? OFFSET ?'
        ).bind(per, (page - 1) * per).all();
        const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM admin_logs').first();
        return json({ logs: results, total: c.n, page, per });
      }
      if (seg[0] === 'admin' && seg[1] === 'stats' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const u = await env.DB.prepare('SELECT COUNT(*) AS n FROM users').first();
        const t = await env.DB.prepare('SELECT COUNT(*) AS n FROM threads').first();
        const p = await env.DB.prepare('SELECT COUNT(*) AS n FROM posts').first();
        const b = await env.DB.prepare('SELECT COUNT(*) AS n FROM boards').first();
        const today = await env.DB.prepare('SELECT COUNT(*) AS n FROM posts WHERE created_at>?').bind(Date.now() - 86400 * 1000).first();
        return json({ users: u.n, threads: t.n, posts: p.n, boards: b.n, todayPosts: today.n });
      }
      if (seg[0] === 'admin' && seg[1] === 'users' && method === 'GET') {
        const deny = requireAdmin(me); if (deny) return deny;
        const page = Math.max(1, Number(url.searchParams.get('page') || 1));
        const per = 20;
        const { results } = await env.DB.prepare(
          `SELECT id, name, email, is_admin, verified, banned, avatar_url, created_at, points,
                  (SELECT COUNT(*) FROM threads WHERE user_id=users.id) AS thread_count,
                  (SELECT COUNT(*) FROM posts WHERE user_id=users.id) AS post_count
           FROM users ORDER BY id DESC LIMIT ? OFFSET ?`
        ).bind(per, (page - 1) * per).all();
        const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM users').first();
        return json({ users: results, total: c.n, page, per });
      }
      if (seg[0] === 'admin' && seg[1] === 'users' && seg[3] === 'ban' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const uid = Number(seg[2]);
        if (uid === me.id) return json({ error: '不能禁言自己' }, 400);
        await env.DB.prepare('UPDATE users SET banned=? WHERE id=?').bind(body.banned ? 1 : 0, uid).run();
        await adminLog(env, me, body.banned ? '禁言用户' : '解禁用户', 'user', uid, null);
        return json({ ok: true });
      }
      if (seg[0] === 'admin' && seg[1] === 'users' && seg[3] === 'role' && method === 'POST') {
        const deny = requireAdmin(me); if (deny) return deny;
        const uid = Number(seg[2]);
        if (uid === me.id) return json({ error: '不能修改自己的管理员身份' }, 400);
        await env.DB.prepare('UPDATE users SET is_admin=? WHERE id=?').bind(body.is_admin ? 1 : 0, uid).run();
        await adminLog(env, me, body.is_admin ? '设为管理员' : '撤销管理员', 'user', uid, null);
        return json({ ok: true });
      }
      if (seg[0] === 'admin' && seg[1] === 'users' && seg.length === 3 && method === 'DELETE') {
        const deny = requireAdmin(me); if (deny) return deny;
        const uid = Number(seg[2]);
        if (uid === me.id) return json({ error: '不能删除自己' }, 400);
        const tids = await env.DB.prepare('SELECT id FROM threads WHERE user_id=?').bind(uid).all();
        const batch = [
          env.DB.prepare('DELETE FROM sessions WHERE user_id=?').bind(uid),
          env.DB.prepare('DELETE FROM verify_tokens WHERE user_id=?').bind(uid),
          env.DB.prepare('DELETE FROM password_resets WHERE user_id=?').bind(uid),
          env.DB.prepare('DELETE FROM notifications WHERE user_id=? OR from_user_id=?').bind(uid, uid),
          env.DB.prepare('DELETE FROM likes WHERE user_id=?').bind(uid),
          env.DB.prepare('DELETE FROM favorites WHERE user_id=?').bind(uid),
          env.DB.prepare('DELETE FROM reports WHERE reporter_id=?').bind(uid),
          env.DB.prepare('DELETE FROM dm_messages WHERE sender_id=? OR receiver_id=?').bind(uid, uid),
          env.DB.prepare('DELETE FROM posts WHERE user_id=?').bind(uid),
        ];
        for (const t of tids.results) {
          batch.push(env.DB.prepare('DELETE FROM threads_fts WHERE thread_id=?').bind(t.id));
        }
        batch.push(env.DB.prepare('DELETE FROM threads WHERE user_id=?').bind(uid));
        batch.push(env.DB.prepare('DELETE FROM users WHERE id=?').bind(uid));
        await env.DB.batch(batch);
        await adminLog(env, me, '删除用户', 'user', uid, null);
        return json({ ok: true });
      }
      if (seg[0] === 'admin' && seg[1] === 'boards' && seg.length === 3 && method === 'PUT') {
        const deny = requireAdmin(me); if (deny) return deny;
        const bid = Number(seg[2]);
        const name = String(body.name || '').trim().slice(0, 30);
        const descr = String(body.descr || '').trim().slice(0, 100);
        const sort = Math.max(0, Math.min(999, Number(body.sort) || 99));
        if (!name) return json({ error: '版块名不能为空' }, 400);
        await env.DB.prepare('UPDATE boards SET name=?, descr=?, sort=? WHERE id=?').bind(name, descr, sort, bid).run();
        return json({ ok: true });
      }
      if (seg[0] === 'admin' && seg[1] === 'boards' && seg.length === 3 && method === 'DELETE') {
        const deny = requireAdmin(me); if (deny) return deny;
        const bid = Number(seg[2]);
        const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM threads WHERE board_id=?').bind(bid).first();
        if (c.n > 0) return json({ error: '版块下还有 ' + c.n + ' 个主题，不能删除' }, 400);
        await env.DB.prepare('DELETE FROM boards WHERE id=?').bind(bid).run();
        return json({ ok: true });
      }

      return json({ error: '未知接口' }, 404);
    } catch (e) {
      return json({ error: '服务器错误' }, 500);
    }
  },

  // Cron 定时触发（每 6 小时）：AI 每日精选管线，失败只记日志不影响论坛
  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      runAiDigest(env)
        .then(r => console.log('[ai-digest] ' + JSON.stringify(r)))
        .catch(e => console.log('[ai-digest] fatal: ' + (e && e.message)))
    );
  },
};
