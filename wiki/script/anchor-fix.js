// console.log('✅ [Wiki.js Anchor Script v11] - 终极决战版脚本已加载。');

/**
 * 核心函数：展开并滚动
 * @param {string} targetId - 目标ID
 * @param {string} source - 调用来源 ('click' 或 'pageload')
 */
function openAndScrollTo(targetId, source) {
  try {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) { return; }

    const scrollWithOffset = (element) => {
      // 最终执行滚动的函数
      const finalScroll = () => {
        const navbarHeight = 64;  // 您的导航栏高度
        const extraPadding = 20;  // 您期望的额外间隙
        const offset = navbarHeight + extraPadding;
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        console.log(`🚀 [${source}] - 已执行最终滚动，总偏移量: ${offset}px`);
      };

      // 【核心策略】根据来源决定是否需要延时
      if (source === 'pageload') {
        // 如果是页面加载触发的，我们需要等待足够长的时间让框架自己的滚动先完成
        setTimeout(finalScroll, 200); // 给予 200ms 的修正延迟
      } else {
        // 如果是点击触发的，因为我们阻止了默认行为，所以可以立即滚动
        finalScroll();
      }
    };

    if (targetElement.tagName === 'DETAILS') {
      if (!targetElement.open) {
        targetElement.open = true;
      }
      scrollWithOffset(targetElement);
    } else {
      scrollWithOffset(targetElement);
    }
  } catch (error) {
    console.error(`💥 [${source}] - 执行期间发生意外错误:`, error);
  }
}


// ------------------- 主逻辑 -------------------

// 【功能一：页面加载时的状态持久化 - 增强版】
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const targetId = decodeURIComponent(window.location.hash.substring(1));
    console.log(`[pageload] - 检测到锚点 #${targetId}。开始轮询查找元素...`);

    let attempts = 0;
    const maxAttempts = 50; // 最多尝试5秒
    const interval = setInterval(() => {
      const element = document.getElementById(targetId);
      attempts++;

      if (element) {
        clearInterval(interval);
        console.log(`[pageload] - 在第 ${attempts} 次尝试后找到元素，准备执行滚动修正...`);
        // 调用核心函数，并明确告知来源是 'pageload'
        openAndScrollTo(targetId, 'pageload');
      } else if (attempts > maxAttempts) {
        clearInterval(interval);
        console.error(`[pageload] - 尝试 ${maxAttempts} 次后仍未找到元素 #${targetId}。`);
      }
    }, 100);
  }
});


// 【功能二：用户点击链接时的交互】
document.body.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.hash && link.pathname === window.location.pathname) {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = decodeURIComponent(link.hash.substring(1));
    // 调用核心函数，并明确告知来源是 'click'
    openAndScrollTo(targetId, 'click');

    history.pushState(null, null, link.hash);
  }
}, true);
