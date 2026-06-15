# 快速操作卡片

## 🚀 首次部署（一次性操作）

```bash
# 1. 本地：生成 SSH 密钥
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/deploy_mba_site -N ""

# 2. 上传公钥到服务器
ssh-copy-id -i ~/.ssh/deploy_mba_site.pub deploy@YOUR_SERVER_IP

# 3. 上传并执行服务器初始化脚本
scp deploy/scripts/setup-server.sh deploy@YOUR_SERVER_IP:/tmp/
ssh deploy@YOUR_SERVER_IP "sudo bash /tmp/setup-server.sh"

# 4. 配置 Nginx（在服务器上）
ssh deploy@YOUR_SERVER_IP
sudo nano /etc/nginx/sites-available/mba.mia-portfolio.cn
# 粘贴 deploy/nginx/mba.mia-portfolio.cn.conf 的内容
sudo ln -s /etc/nginx/sites-available/mba.mia-portfolio.cn /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 5. 申请 SSL 证书（在服务器上）
sudo certbot --nginx -d mba.mia-portfolio.cn

# 6. 在 GitHub 仓库 Settings → Secrets 添加：
#    SERVER_HOST = YOUR_SERVER_IP
#    SERVER_USER = deploy
#    SERVER_SSH_KEY = (cat ~/.ssh/deploy_mba_site 的内容)

# 7. 本地创建环境变量
cp .env.production.example .env.production

# 8. 提交并推送
git add .github deploy/ .gitignore .env.production.example .env.deploy.example
git commit -m "feat: 添加自动化部署配置"
git push origin main
```

## 🔄 日常开发

```bash
# 开发
npm run dev

# 构建测试
npm run build && npm run preview

# 推送即部署
git add .
git commit -m "你的提交信息"
git push origin main
```

## 🔙 回滚

```bash
ssh deploy@YOUR_SERVER_IP
bash /var/www/mba-site/rollback.sh          # 回滚到上一版本
bash /var/www/mba-site/rollback.sh 20260615_120000  # 回滚到指定版本
```

## ✅ 验证

```bash
ssh deploy@YOUR_SERVER_IP
bash /var/www/mba-site/verify-deployment.sh
```

## 📊 查看部署状态

```bash
# GitHub Actions 状态
# 打开: https://github.com/YOUR_REPO/actions

# 服务器当前版本
ssh deploy@YOUR_SERVER_IP "ls -la /var/www/mba-site/current/"

# Nginx 状态
ssh deploy@YOUR_SERVER_IP "sudo systemctl status nginx"

# 查看实时访问日志
ssh deploy@YOUR_SERVER_IP "sudo tail -f /var/log/nginx/mba.mia-portfolio.cn.access.log"
```
