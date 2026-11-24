import { describe, expect, it } from "vitest";
import { getContactSubmissionResult } from "@/lib/pvr-content";
describe("Static contact form", () => {
  it("does not send an enquiry without an external contact method", () => {
    expect(getContactSubmissionResult().sent).toBe(false);
  });
  it("does not store enquiry details", () => {
    expect(getContactSubmissionResult().stored).toBe(false);
  });
});
