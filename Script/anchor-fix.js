document.addEventListener('DOMContentLoaded', () => {
  // 监听所有点击事件
  document.body.addEventListener('click', (e) => {
    // 获取被点击的链接元素
    const link = e.target.closest('a');

    // 检查是否是一个有效的、指向当前页面锚点的链接
    if (link && link.hash && link.pathname === window.location.pathname) {
      // 阻止默认的页面跳转/哈希更改行为
      e.preventDefault();

      try {
        // 获取锚点ID (例如, 从 #section-1 获取 section-1)
        const targetId = decodeURIComponent(link.hash.substring(1));
        // 查找对应的目标元素
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // 如果找到元素，则平滑滚动到该位置
          targetElement.scrollIntoView({
            behavior: 'smooth', // 平滑滚动
            block: 'start'      // 滚动到元素顶部
          });

          // 可选：手动更新URL的hash，但不会触发页面重载
          history.pushState(null, null, link.hash);
        }
      } catch (error) {
        console.error('Error scrolling to anchor:', error);
      }
    }
  });
});
