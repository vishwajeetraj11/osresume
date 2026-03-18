const DEFAULT_DB_NAME = 'osresume';

const ENV_KEYS = ['MONGODB_URI', 'MONGO_URI', 'NEXT_PUBLIC_MONGO_URI', 'NEXT_PUBLIC_MONOGO_URI'];

const hasDatabaseName = uri => /\/\/[^/]+\/[^?]/.test(uri);

const normalizeMongoUri = uri => {
  if (!uri || hasDatabaseName(uri)) {
    return uri;
  }

  if (uri.includes('/?')) {
    return uri.replace('/?', `/${DEFAULT_DB_NAME}?`);
  }

  if (uri.endsWith('/')) {
    return `${uri}${DEFAULT_DB_NAME}`;
  }

  return `${uri}/${DEFAULT_DB_NAME}`;
};

const getMongoUri = () => {
  const rawUri = ENV_KEYS.map(key => process.env[key]).find(Boolean);

  if (!rawUri) {
    throw new Error(
      `Please define one of these MongoDB environment variables inside .env: ${ENV_KEYS.join(', ')}`,
    );
  }

  return normalizeMongoUri(rawUri);
};

export default getMongoUri;
