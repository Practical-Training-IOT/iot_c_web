# 使用官方Node.js镜像作为基础镜像
FROM node:20-slim

# 设置工作目录
WORKDIR /usr/src/app

# 环境变量设置
ENV NODE_ENV=production

# 安装 PNPM 并启用 Corepack
ENV PNPM_HOME="/usr/local/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 复制 package.json 和 pnpm-lock.yaml 文件以安装依赖
COPY package*.json ./
COPY pnpm-lock.yaml ./

# 安装生产环境依赖
RUN --mount=type=cache,id=pnpm,target=/root/.pnpm-store pnpm install --prod

# 复制应用代码
COPY . .

# 如果需要构建步骤，请取消下面的注释并调整为你的构建命令
# RUN npm run build

# 暴露应用运行时使用的端口
EXPOSE 8080

# 启动应用
CMD ["node", "server.js"]

