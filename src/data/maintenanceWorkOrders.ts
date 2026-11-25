// Aggregate-only export from the November 25, 2026 Supabase snapshot.
// One row per work order created April 1–November 24 UTC, excluding one test.
// Notes and attachments use the same order IDs and November 25 UTC cutoff.
export const study = {
  path: "/resources/maintenance-work-order-case-study/",
  updatedAt: "2026-11-25",
  orders: 147,
  excludedTests: 1,
  properties: 25,
  assigned: 142,
  newWithAssignee: 62,
  newWithNote: 23,
  urgentAssigned: 43,
  statuses: { new: 65, inProgress: 2, awaitingInvoice: 34, paidArchive: 40, cancelled: 6 },
  priorities: { low: 3, medium: 100, high: 39, emergency: 5 },
  monthlyOrders: [
    { month: "April", count: 4 },
    { month: "May", count: 18 },
    { month: "June", count: 19 },
    { month: "July", count: 22 },
    { month: "August", count: 13 },
    { month: "September", count: 26 },
    { month: "October", count: 26 },
    { month: "November", count: 19 },
  ],
  notes: 95,
  ordersWithNotes: 71,
  images: 47,
  ordersWithImages: 7,
  ordersWithBoth: 4,
  medianHoursToFirstNote: 309.619,
  cancellationsWithReason: 6,
} as const;

export const projectDetails: {
  buildDays?: number;
  dailyUserRoles?: string;
  agentSkills?: string[];
  agentMistakesAndFixes?: string[];
  newStatusReason?: string;
  timingSampleSize?: number;
  triageStarted?: boolean;
  triageResultsMonth?: string;
  demoEmbedUrl?: string;
  testimonial?: { quote: string; anonymizedTitle: string };
} = {
  // TODO: Fill in the owner's answers here as they arrive.
  // buildDays: [N] days to build.
  // dailyUserRoles: [roles] confirmed to use the queue daily since April 2026.
  // agentSkills: [two or three skills the owner wrote, one line each].
  // agentMistakesAndFixes: [two or three agent mistakes, each paired with its fix].
  // newStatusReason: [the team's reason for leaving orders in New].
  // timingSampleSize: [N] real orders to time before and after.
  // triageStarted: true when the owner confirms the AI triage test has started.
  // triageResultsMonth: [month] the owner expects results.
  // demoEmbedUrl: [embed URL for the 60–90 second recording].
  // testimonial: [verbatim manager quote and anonymized title, supplied together].
};

// Fixed project estimate for administrative coordination. Supabase supplies the order count.
export const estimatedMinutesPerOrder = 30;
export const estimatedMinutesSaved = study.orders * estimatedMinutesPerOrder;
export const estimatedHoursSaved = estimatedMinutesSaved / 60;
