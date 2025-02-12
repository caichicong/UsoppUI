// 定义自定义元素
class UsoppDialog extends HTMLElement {
    constructor() {
        super();

        // 创建 Shadow DOM
        this.attachShadow({mode: 'open'});

        // 定义样式
        const style = `
      .dialog-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
      }
      
      .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        min-width: 300px;
      }
      
      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .close-btn {
        cursor: pointer;
        border: none;
        background: none;
        font-size: 18px;
      }
      
      .dialog-content {
        margin-bottom: 15px;
      }
      
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
      

    .confirm-btn, .cancel-btn {
        background-color: blue;
        color: white;
        border: none;
        cursor: pointer;
    }
    `;

        // 创建模板
        const template = `
      <div class="dialog-container">
        <div class="dialog">
          <div class="dialog-header">
            <h3><slot name="title">Dialog Title</slot></h3>
            <button class="close-btn">&times;</button>
          </div>
          <div class="dialog-content">
            <slot></slot>
          </div>
          <div class="dialog-footer">
            <slot name="footer">
              <button class="cancel-btn">取消</button>
              <button class="confirm-btn">确定</button>
            </slot>
          </div>
        </div>
      </div>
    `;

        // 将样式和模板添加到 Shadow DOM
        this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${template}
    `;

        // 获取元素引用
        this.container = this.shadowRoot.querySelector('.dialog-container');
        this.closeBtn = this.shadowRoot.querySelector('.close-btn');
        this.cancelBtn = this.shadowRoot.querySelector('.cancel-btn');
        this.confirmBtn = this.shadowRoot.querySelector('.confirm-btn');

        // 绑定事件处理函数
        this.closeBtn.addEventListener('click', () => this.hide());
        this.cancelBtn?.addEventListener('click', () => this.hide());
        this.confirmBtn?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('confirm'));
            this.hide();
        });

        // 点击遮罩层关闭
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.hide();
            }
        });
    }

    // 定义观察的属性
    static get observedAttributes() {
        return ['visible'];
    }

    // 属性变化回调
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'visible') {
            this.container.style.display = newValue === 'true' ? 'block' : 'none';
        }
    }

    // 显示对话框
    show() {
        this.setAttribute('visible', 'true');
    }

    // 隐藏对话框
    hide() {
        this.setAttribute('visible', 'false');
    }
}

// 注册自定义元素
customElements.define('usopp-dialog', UsoppDialog);
export default UsoppDialog;
