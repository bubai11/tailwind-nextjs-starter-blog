#!/bin/bash

# 确保脚本在错误时停止
set -e

# 检查是否提供了仓库信息
if [ -z "$GITHUB_TOKEN" ]; then
    echo "错误: 需要设置 GITHUB_TOKEN 环境变量"
    exit 1
fi

if [ -z "$GITHUB_REPOSITORY" ]; then
    echo "错误: 需要设置 GITHUB_REPOSITORY 环境变量"
    exit 1
fi

# 创建标签的函数
create_label() {
    local name=$1
    local color=$2
    local description=$3

    echo "处理标签: $name"
    
    # 检查标签是否已存在
    if curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$GITHUB_REPOSITORY/labels/$name" | grep -q "\"name\": \"$name\""; then
        echo "更新标签: $name"
        curl -X PATCH \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Content-Type: application/json" \
            "https://api.github.com/repos/$GITHUB_REPOSITORY/labels/$name" \
            -d "{\"name\":\"$name\",\"color\":\"${color#*#}\",\"description\":\"$description\"}"
    else
        echo "创建标签: $name"
        curl -X POST \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Content-Type: application/json" \
            "https://api.github.com/repos/$GITHUB_REPOSITORY/labels" \
            -d "{\"name\":\"$name\",\"color\":\"${color#*#}\",\"description\":\"$description\"}"
    fi
    echo "完成标签: $name"
}

# 创建基础标签
echo "开始创建基础标签..."
create_label "content" "0366d6" "博客内容相关"
echo "基础标签创建完成"

# 创建状态标签
echo "开始创建状态标签..."
create_label "in-progress" "fbca04" "正在进行中"
create_label "review" "6f42c1" "等待审核"
echo "状态标签创建完成"

# 创建技术标签
echo "开始创建技术标签..."
create_label "next" "000000" "React框架，用于构建现代化的Web应用"
create_label "react" "61DAFB" "用于构建用户界面的JavaScript库"
create_label "web开发" "22C55E" "Web应用开发相关的技术和最佳实践"
create_label "tailwind" "38B2AC" "实用优先的CSS框架"
create_label "博客开发" "9333EA" "个人博客开发相关的经验和教程"
create_label "技术选型" "EAB308" "项目技术栈的选择和决策过程"
create_label "前端框架" "EF4444" "现代前端框架相关的知识和实践"
create_label "入门教程" "60A5FA" "适合初学者的基础教程"
echo "技术标签创建完成"

echo "所有标签创建完成！" 