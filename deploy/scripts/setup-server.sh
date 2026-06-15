#!/bin/bash
# ============================================================
# 腾讯云服务器一键部署脚本
# ============================================================
# 使用方法：
# 1. 上传到服务器: scp setup-server.sh user@your-server:/tmp/
# 2. SSH 登录服务器: ssh user@your-server
# 3. 执行脚本: sudo bash /tmp/setup-server.sh
# ============================================================

set -euo pipefail

echo "=========================================="
echo "  MBA 站点服务器初始化脚本"
echo "  域名: mba.mia-portfolio.cn"
echo "=========================================="

# ----- 颜色定义 -----
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# ----- 检查 root 权限 -----
if [ "$EUID" -ne 0 ]; then
    log_error "请使用 sudo 或 root 执行此脚本"
    exit 1
fi

# ----- 1. 创建部署目录结构 -----
log_info "1/7 创建目录结构..."
mkdir -p /var/www/mba-site/{dist,current,backups}
mkdir -p /var/www/mba-site/logs

log_info "目录结构:"
log_info "  /var/www/mba-site/"
log_info "  ├── dist/      <- GitHub Actions 上传新构建"
log_info "  ├── current/   <- 当前在线版本（符号链接或实际文件）"
log_info "  ├── backups/   <- 历史备份（自动保留最近 5 个）"
log_info "  └── logs/      <- 访问日志"

# ----- 2. 创建部署用户（如果不存在） -----
log_info "2/7 配置部署用户..."
if ! id -u deploy &>/dev/null; then
    useradd -m -s /bin/bash deploy
    log_info "已创建 deploy 用户"
else
    log_info "deploy 用户已存在"
fi

# 将目录所有权给 deploy 用户，Nginx 可读
chown -R deploy:deploy /var/www/mba-site
chmod -R 750 /var/www/mba-site

# ----- 3. 安装 Nginx（如果未安装） -----
log_info "3/7 检查 Nginx..."
if ! command -v nginx &>/dev/null; then
    apt-get update
    apt-get install -y nginx
    log_info "Nginx 已安装"
else
    log_info "Nginx 已存在: $(nginx -v 2>&1)"
fi

# ----- 4. 安装 Certbot（SSL 证书工具） -----
log_info "4/7 安装 Certbot..."
if ! command -v certbot &>/dev/null; then
    apt-get install -y certbot python3-certbot-nginx
    log_info "Certbot 已安装"
else
    log_info "Certbot 已存在"
fi

# ----- 5. 配置 Nginx -----
log_info "5/7 配置 Nginx..."

# 检查是否已存在配置（避免覆盖手动修改）
NGINX_CONF="/etc/nginx/sites-available/mba.mia-portfolio.cn"
if [ -f "$NGINX_CONF" ]; then
    log_warn "Nginx 配置已存在: $NGINX_CONF"
    log_warn "如需更新配置，请先备份并删除该文件后重新运行"
else
    log_info "请将 deploy/nginx/mba.mia-portfolio.cn.conf 的内容复制到:"
    log_info "  $NGINX_CONF"
    log_info "然后运行: ln -s $NGINX_CONF /etc/nginx/sites-enabled/"
fi

# ----- 6. 配置防火墙 -----
log_info "6/7 配置 UFW 防火墙..."
if command -v ufw &>/dev/null; then
    ufw allow 'Nginx Full' 2>/dev/null || true
    ufw allow OpenSSH 2>/dev/null || true
    log_info "防火墙规则已配置: 允许 HTTP(80), HTTPS(443), SSH(22)"
fi

# ----- 7. 配置 SSH 密钥（用于 GitHub Actions） -----
log_info "7/7 配置 SSH 访问..."
SSH_DIR="/home/deploy/.ssh"
mkdir -p "$SSH_DIR"
chown -R deploy:deploy "$SSH_DIR"
chmod 700 "$SSH_DIR"

log_info "下一步: 将 GitHub Actions 的 SSH 公钥添加到:"
log_info "  /home/deploy/.ssh/authorized_keys"

# ----- 设置 Nginx 开机自启 -----
systemctl enable nginx
systemctl enable ufw 2>/dev/null || true

echo ""
echo "=========================================="
echo -e "${GREEN}✅ 服务器初始化完成!${NC}"
echo "=========================================="
echo ""
echo "后续步骤:"
echo "  1. 配置 Nginx（见上方提示）"
echo "  2. 配置 SSH 密钥（见上方提示）"
echo "  3. 申请 SSL 证书:"
echo "     certbot --nginx -d mba.mia-portfolio.cn"
echo "  4. 在 GitHub 设置中添加 Secrets"
echo "  5. Push 代码到 main 分支触发自动部署"
echo ""
