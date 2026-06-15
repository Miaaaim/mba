# mba.mia-portfolio.cn 部署指南

## 📋 项目分析

| 项目 | 详情 |
|------|------|
| **框架** | React 19 + Vite 6 + TypeScript |
| **构建命令** | `npm run build` |
| **构建输出** | `dist/` 目录 |
| **应用类型** | SPA (单页应用) |
| **环境变量** | `GEMINI_API_KEY`, `VITE_APP_URL` |

---

## 1. 当前项目部署链路

```
VS Code (本地开发)
    ↓ git push
GitHub (代码仓库)
    ↓ GitHub Actions 自动触发
自动构建 (npm ci --include=optional → npm run build:cloud)
    ↓ SCP 上传
腾讯云服务器 (/var/www/mba-site/dist)
    ↓ 原子切换
Nginx (/var/www/mba-site/current)
    ↓
mba.mia-portfolio.cn (用户访问)
```

---

## 2. 腾讯云服务器配置

### 2.1 目录结构

```
/var/www/
├── mia-site/          # 现有站点（不受影响）
│   └── ...
└── mba-site/          # 新站点（本次部署）
    ├── dist/          # GitHub Actions 上传的新构建产物
    ├── current/       # 当前在线版本
    ├── backups/       # 历史备份（自动保留最近 5 个）
    └── logs/          # 访问日志
```

### 2.2 初始化服务器

```bash
# 1. 上传初始化脚本
scp deploy/scripts/setup-server.sh user@your-server:/tmp/

# 2. SSH 登录服务器
ssh user@your-server

# 3. 执行初始化
sudo bash /tmp/setup-server.sh
```

---

## 3. DNS 配置（腾讯云）

### 登录腾讯云控制台 → DNS 解析

新增一条 **A 记录**：

| 字段 | 值 |
|------|------|
| 记录类型 | `A` |
| 记录值 | `你的服务器公网 IP` |
| 主机记录 | `mba` |
| TTL | `600` |

> ⚠️ 这条记录和 `mia-portfolio.cn` 的 A 记录指向**同一个 IP**（同一台服务器），Nginx 通过 `server_name` 区分不同站点。

### 验证 DNS

```bash
dig mba.mia-portfolio.cn A
```

---

## 4. Nginx 配置

### 4.1 创建配置文件

```bash
# 将本地配置文件内容复制到服务器
sudo nano /etc/nginx/sites-available/mba.mia-portfolio.cn
```

内容见 `deploy/nginx/mba.mia-portfolio.cn.conf`

### 4.2 启用配置

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/mba.mia-portfolio.cn /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 4.3 为什么不影响现有站点

Nginx 通过 `server_name` 指令区分不同域名：

- `mia-portfolio.cn` → 现有站点配置
- `mba.mia-portfolio.cn` → 新站点配置

两个配置完全独立，互不影响。

---

## 5. SSL 证书配置

### 5.1 使用 Certbot 自动申请

```bash
# 安装 Certbot（setup-server.sh 已自动安装）
sudo certbot --nginx -d mba.mia-portfolio.cn
```

Certbot 会：
1. 自动向 Let's Encrypt 申请免费证书
2. 自动修改 Nginx 配置中的证书路径
3. 自动配置 HTTP → HTTPS 跳转
4. 自动设置定时续期

### 5.2 手动验证证书

```bash
sudo certbot certificates
```

---

## 6. GitHub Secrets 配置

### 在 GitHub 仓库设置中添加：

| Secret Name | 值 | 说明 |
|-------------|------|------|
| `SERVER_HOST` | `你的服务器 IP` | 腾讯云公网 IP |
| `SERVER_USER` | `deploy` | SSH 用户名 |
| `SERVER_SSH_KEY` | `私钥内容` | SSH 私钥（见下方） |

### 生成 SSH 密钥对

```bash
# 本地执行
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/deploy_mba_site -N ""

# 公钥上传到服务器
ssh-copy-id -i ~/.ssh/deploy_mba_site.pub deploy@your-server-ip

# 测试连接
ssh -i ~/.ssh/deploy_mba_site deploy@your-server-ip

# 私钥内容复制到 GitHub Secrets
cat ~/.ssh/deploy_mba_site
```

---

## 7. 环境变量

### 创建 `.env.production`

```bash
# 本地项目根目录
cp .env.production.example .env.production
```

编辑 `.env.production`：

```env
VITE_APP_URL=https://mba.mia-portfolio.cn
```

> ⚠️ `.env.production` 已在 `.gitignore` 中，不会被提交到 Git。
> GitHub Actions 中如需使用敏感变量，在 **Settings → Secrets and variables → Actions** 中添加。

---

## 8. 触发首次部署

```bash
# 1. 确保在 main 分支
git checkout main

# 2. 提交所有部署配置
git add .github/workflows/deploy.yml
git add deploy/
git add .env.deploy.example
git add .env.production.example
git commit -m "feat: 添加自动化部署配置"

# 3. 推送到 GitHub
git push origin main
```

Push 后，GitHub Actions 会自动：
1. ✅ 检出代码
2. ✅ 安装依赖
3. ✅ 构建项目
4. ✅ 上传到服务器
5. ✅ 原子切换版本
6. ✅ 重载 Nginx

---

## 9. 回滚方案

### 自动回滚（推荐）

```bash
# SSH 登录服务器
ssh deploy@your-server-ip

# 回滚到上一个版本
bash /var/www/mba-site/rollback.sh

# 或回滚到指定时间戳版本
bash /var/www/mba-site/rollback.sh 20260615_120000
```

### 手动回滚

```bash
# 查看可用备份
ls -la /var/www/mba-site/backups/

# 手动切换
sudo cp -r /var/www/mba-site/backups/backup_XXXX /var/www/mba-site/current
sudo systemctl reload nginx
```

---

## 10. 验证清单

### 部署完成后执行：

```bash
# 1. 运行验证脚本
bash /var/www/mba-site/verify-deployment.sh

# 2. 手动验证
curl -I https://mba.mia-portfolio.cn          # 检查 HTTPS
curl -I http://mba.mia-portfolio.cn           # 检查 HTTP → HTTPS 跳转
curl https://mba.mia-portfolio.cn             # 检查页面内容

# 3. 检查 Nginx 日志
sudo tail -f /var/log/nginx/mba.mia-portfolio.cn.access.log
sudo tail -f /var/log/nginx/mba.mia-portfolio.cn.error.log
```

### GitHub Actions 验证

1. 打开 GitHub 仓库 → **Actions** 标签
2. 查看最新工作流运行状态
3. 确认所有步骤显示 ✅

---

## 11. 故障排查

### Nginx 配置错误

```bash
sudo nginx -t                                    # 检查配置语法
sudo journalctl -u nginx --no-pager -n 50        # 查看 Nginx 日志
```

### SSH 连接失败

```bash
# 检查 SSH 密钥权限
chmod 600 ~/.ssh/deploy_mba_site
chmod 700 ~/.ssh/

# 检查服务器 SSH 服务
sudo systemctl status sshd
```

### 构建失败

```bash
# 本地模拟构建
npm ci --include=optional
npm run build:cloud
```

---

## 12. 双站点隔离说明

| 维度 | mia-portfolio.cn | mba.mia-portfolio.cn |
|------|-----------------|---------------------|
| **Nginx 配置** | `/etc/nginx/sites-available/mia-portfolio.cn` | `/etc/nginx/sites-available/mba.mia-portfolio.cn` |
| **部署目录** | `/var/www/mia-site/` | `/var/www/mba-site/` |
| **SSL 证书** | `/etc/letsencrypt/live/mia-portfolio.cn/` | `/etc/letsencrypt/live/mba.mia-portfolio.cn/` |
| **GitHub 仓库** | 独立仓库 | 本仓库 |
| **构建产物** | 独立 | `dist/` |
| **环境变量** | 独立 | `.env.production` |

**两个站点完全隔离，互不影响。**
