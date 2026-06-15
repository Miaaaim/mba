#!/bin/bash
# ============================================================
# 部署验证脚本 - 检查所有组件是否正常
# ============================================================
# 使用方法（SSH 登录服务器后执行）:
#   bash verify-deployment.sh
# ============================================================

set -euo pipefail

DOMAIN="mba.mia-portfolio.cn"
SITE_DIR="/var/www/mba-site"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

check() {
    local name="$1"
    local result="$2"
    if [ "$result" = "0" ]; then
        echo -e "  ${GREEN}✅${NC} $name"
        ((PASS++))
    else
        echo -e "  ${RED}❌${NC} $name"
        ((FAIL++))
    fi
}

echo "=========================================="
echo "  部署验证 - $DOMAIN"
echo "=========================================="
echo ""

# 1. DNS 解析
echo "🌐 DNS 解析"
DNS_IP=$(dig +short "$DOMAIN" A 2>/dev/null | head -1)
if [ -n "$DNS_IP" ]; then
    check "DNS A 记录指向 $DNS_IP" "0"
else
    check "DNS A 记录解析" "1"
fi
echo ""

# 2. Nginx 状态
echo "🔧 Nginx"
nginx -t &>/dev/null
check "Nginx 配置语法正确" "$?"
systemctl is-active nginx &>/dev/null
check "Nginx 服务运行中" "$?"
echo ""

# 3. 文件结构
echo "📁 文件结构"
[ -d "$SITE_DIR/current" ]
check "current 目录存在" "$?"
[ -f "$SITE_DIR/current/index.html" ]
check "index.html 存在" "$?"
[ -d "$SITE_DIR/current/assets" ]
check "assets 目录存在" "$?"
echo ""

# 4. SSL 证书
echo "🔒 SSL 证书"
if command -v certbot &>/dev/null; then
    certbot certificates --non-interactive 2>/dev/null | grep -q "$DOMAIN"
    check "SSL 证书已配置" "$?"
else
    echo -e "  ${YELLOW}⚠️${NC} Certbot 未安装，跳过 SSL 检查"
fi
echo ""

# 5. HTTPS 访问
echo "🌍 HTTPS 访问"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -k "https://$DOMAIN" 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    check "HTTPS 返回 200" "0"
else
    check "HTTPS 返回 200 (实际: $HTTP_CODE)" "1"
fi

# HTTP -> HTTPS 跳转
REDIRECT_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" 2>/dev/null || echo "000")
if [ "$REDIRECT_CODE" = "301" ] || [ "$REDIRECT_CODE" = "302" ]; then
    check "HTTP 跳转到 HTTPS" "0"
else
    check "HTTP 跳转到 HTTPS (实际: $REDIRECT_CODE)" "1"
fi
echo ""

# 6. 页面内容
echo "📄 页面内容"
PAGE_CONTENT=$(curl -sk "https://$DOMAIN" 2>/dev/null)
if echo "$PAGE_CONTENT" | grep -q "root"; then
    check "页面包含 React 根节点" "0"
else
    check "页面包含 React 根节点" "1"
fi
echo ""

# 总结
echo "=========================================="
echo -e "  结果: ${GREEN}$PASS 通过${NC}, ${RED}$FAIL 失败${NC}"
echo "=========================================="

if [ "$FAIL" -gt 0 ]; then
    exit 1
fi
