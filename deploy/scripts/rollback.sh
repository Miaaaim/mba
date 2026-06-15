#!/bin/bash
# ============================================================
# 回滚脚本 - 快速恢复到上一个版本
# ============================================================
# 使用方法（SSH 登录服务器后执行）:
#   bash rollback.sh              # 回滚到上一个版本
#   bash rollback.sh 20260615_120000  # 回滚到指定时间戳版本
# ============================================================

set -euo pipefail

SITE_DIR="/var/www/mba-site"
BACKUP_DIR="$SITE_DIR/backups"

echo "=========================================="
echo "  回滚脚本 - mba.mia-portfolio.cn"
echo "=========================================="

# 检查备份目录是否存在
if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ 备份目录不存在: $BACKUP_DIR"
    exit 1
fi

# 列出所有可用备份
echo ""
echo "📋 可用备份列表:"
echo "-------------------------------------------"
ls -1dt "$BACKUP_DIR"/backup_* 2>/dev/null | while read -r backup; do
    TIMESTAMP=$(basename "$backup" | sed 's/backup_//')
    echo "  $TIMESTAMP"
done
echo "-------------------------------------------"

# 如果传入了参数，回滚到指定版本
if [ $# -gt 0 ]; then
    TARGET="$BACKUP_DIR/backup_${1}"
    if [ ! -d "$TARGET" ]; then
        echo "❌ 指定备份不存在: $TARGET"
        exit 1
    fi
    echo "🔄 回滚到: $1"
else
    # 否则回滚到最新的备份
    TARGET=$(ls -1dt "$BACKUP_DIR"/backup_* 2>/dev/null | head -1)
    if [ -z "$TARGET" ]; then
        echo "❌ 没有找到任何备份"
        exit 1
    fi
    echo "🔄 回滚到最新备份: $(basename $TARGET)"
fi

# 执行回滚
echo ""
echo "🔄 执行回滚..."
cp -r "$TARGET" "$SITE_DIR/dist"
rm -rf "$SITE_DIR/current"
cp -r "$SITE_DIR/dist" "$SITE_DIR/current"

# 重载 Nginx
echo "🔄 重载 Nginx..."
nginx -t && systemctl reload nginx

echo ""
echo "✅ 回滚完成!"
echo "   请访问 https://mba.mia-portfolio.cn 验证"
