/* ============================================================
   北京幻象集团官网 —— 纯静态版脚本
   主题切换 / 导航交互 / 滚动揭示动画 / 表单校验
   ============================================================ */

(function () {
  'use strict';

  /* ===== 深色模式切换 ===== */
  var themeToggle = document.getElementById('theme-toggle');
  var mThemeToggle = document.getElementById('m-theme-toggle');
  var themeLabels = document.querySelectorAll('.theme-label, .m-theme-label');

  function applyTheme(dark) {
    var root = document.documentElement;
    if (dark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    // 同步按钮文字（浅色模式下提示"切到深色"，深色模式下提示"切到浅色"）
    themeLabels.forEach(function (el) {
      el.textContent = dark ? '浅色' : '深色';
    });
    // 移动端按钮文字更长，单独处理
    var mLabel = document.querySelector('.m-theme-label');
    if (mLabel) mLabel.textContent = dark ? '浅色模式' : '深色模式';
  }

  function toggleTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = !isDark;
    // 平滑过渡类（首帧禁用，避免进入页面时闪动）
    document.documentElement.classList.add('theme-anim');
    applyTheme(next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {}
    // 过渡结束后移除动画类
    setTimeout(function () {
      document.documentElement.classList.remove('theme-anim');
    }, 350);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mThemeToggle) mThemeToggle.addEventListener('click', toggleTheme);
  // 页面加载后同步按钮文字（与 head 内初始化脚本一致）
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark');

  /* ===== 导航栏滚动效果 ===== */
  var navbar = document.querySelector('.navbar');
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== 移动端菜单 ===== */
  var hamburger = document.querySelector('.hamburger');
  if (hamburger && navbar) {
    hamburger.addEventListener('click', function () {
      navbar.classList.toggle('menu-open');
    });
    // 点击菜单项后收起
    document.querySelectorAll('.mobile-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('menu-open');
      });
    });
  }

  /* ===== 滚动揭示动画 ===== */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      // 支持 data-delay 延迟（毫秒）
      var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      if (delay > 0) {
        el.style.transitionDelay = delay + 'ms';
      }
      observer.observe(el);
    });
  } else {
    // 不支持时直接显示
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ===== 联系邮箱复制（联系页） ===== */
  var copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    var copyLabel = document.getElementById('copy-label');
    var emailText = '18510595517@163.com';

    function fallbackCopy() {
      // 兼容不支持 Clipboard API 的浏览器
      var ta = document.createElement('textarea');
      ta.value = emailText;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (e) {}
      document.body.removeChild(ta);
    }

    copyBtn.addEventListener('click', function () {
      var done = function () {
        copyLabel.textContent = '已复制 ✓';
        copyBtn.classList.add('btn-primary');
        copyBtn.classList.remove('btn-glass');
        setTimeout(function () {
          copyLabel.textContent = '复制邮箱';
          copyBtn.classList.remove('btn-primary');
          copyBtn.classList.add('btn-glass');
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText).then(done).catch(function () {
          fallbackCopy();
          done();
        });
      } else {
        fallbackCopy();
        done();
      }
    });
  }

  /* ===== 联系表单（仅联系页存在） ===== */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var fields = {
    name: form.querySelector('#f-name'),
    email: form.querySelector('#f-email'),
    phone: form.querySelector('#f-phone'),
    topic: form.querySelector('#f-topic'),
    message: form.querySelector('#f-message'),
  };

  function showError(key, msg) {
    var err = document.getElementById('err-' + key);
    if (err) {
      err.textContent = msg || '';
      err.style.display = msg ? 'block' : 'none';
    }
  }

  function validate() {
    var ok = true;
    var name = fields.name.value.trim();
    var email = fields.email.value.trim();
    var message = fields.message.value.trim();

    if (!name) {
      showError('name', '请填写您的称呼');
      ok = false;
    } else {
      showError('name', '');
    }

    if (!email) {
      showError('email', '请填写邮箱');
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', '邮箱格式不正确');
      ok = false;
    } else {
      showError('email', '');
    }

    if (!message) {
      showError('message', '请简单描述您的需求');
      ok = false;
    } else if (message.length < 5) {
      showError('message', '内容至少 5 个字');
      ok = false;
    } else {
      showError('message', '');
    }

    return ok;
  }

  // 输入时清除对应错误
  ['name', 'email', 'message'].forEach(function (key) {
    fields[key].addEventListener('input', function () {
      showError(key, '');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = '发送中…';

    // 模拟提交（接入后端后替换为真实请求）
    setTimeout(function () {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }, 900);
  });

  // 「再发一条」按钮
  var againBtn = document.getElementById('send-again');
  if (againBtn) {
    againBtn.addEventListener('click', function () {
      form.reset();
      form.style.display = 'block';
      document.getElementById('form-success').style.display = 'none';
      var btn = document.getElementById('submit-btn');
      btn.disabled = false;
      btn.textContent = '提交留言';
    });
  }
})();
