/** @type {import("drizzle-kit").Config}  */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:pi6SYEyGAM4F@ep-white-frog-a5kkjt0j.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require',
  },
};
