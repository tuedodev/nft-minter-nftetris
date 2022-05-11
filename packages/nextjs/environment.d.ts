declare global {
  namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_NFT_STORAGE_API: string,
        NEXT_PUBLIC_JWT_SECRET: string,
        NEXT_PUBLIC_EMAIL_HOST: string,
        NEXT_PUBLIC_EMAIL_PORT: number,
        NEXT_PUBLIC_EMAIL_USER: string,
        NEXT_PUBLIC_EMAIL_PASSWORD: string,
        POLYGON_TESTNET_ACCOUNT_PRIVATE_KEY1: string,
        POLYGON_TESTNET_ACCOUNT_PRIVATE_KEY2: string,
        AVALANCHE_TESTNET_ACCOUNT_PRIVATE_KEY1?: string,
        AVALANCHE_TESTNET_ACCOUNT_PRIVATE_KEY2?: string,
        NODE_ENV: 'development' | 'production';
    }
  }
}

export {}