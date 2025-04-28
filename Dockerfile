# Gunakan image node sebagai base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan pnpm-lock.yaml ke dalam container
COPY package.json pnpm-lock.yaml ./

# Aktifkan dan siapkan pnpm
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate

# Install dependencies
RUN pnpm install

# Copy seluruh project ke dalam container
COPY . .

# Build aplikasi frontend (sesuaikan dengan build script kamu)
RUN pnpm build

# Expose port yang digunakan oleh aplikasi frontend
EXPOSE 3003

# Jalankan aplikasi frontend
CMD ["pnpm", "dev"]