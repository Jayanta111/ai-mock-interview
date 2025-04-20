import { pgTable, serial, text, varchar,timestamp } from "drizzle-orm/pg-core";

// PostgreSQL-compatible schema definition
export const AiMockInterview = pgTable("AiMockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPossition: varchar("jobPossition", { length: 255 }).notNull(),
  jobDescription: varchar("jobDescription", { length: 1000 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  resume: varchar("resume", { length: 512 }).notNull(), // storing file path or URL
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});
