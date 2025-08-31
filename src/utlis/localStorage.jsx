
//  localStorage.clear()
const employees = [
  {
    id: 1,
    firstname: "Aarav",
    email: "e@e.com",
    password: "123",
    phone: "+1-555-0123",
    address: "123 Main St, New York, NY 10001",
    department: "Sales",
    position: "Sales Manager",
    joinDate: "2023-01-15",
    taskCount: 3,
    taskSummary: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        taskNumber: 1,
        title: "Prepare Sales Report",
        description: "Compile and analyze last quarter's sales data.",
        date: "2025-08-20",
        dueDate: "2025-08-25",
        category: "Sales",
        priority: "high",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        timeSpent: 120,
        comments: []
      },
      {
        taskNumber: 2,
        title: "Team Meeting",
        description: "Discuss project milestones with the development team.",
        date: "2025-08-18",
        dueDate: "2025-08-18",
        category: "Meetings",
        priority: "medium",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        timeSpent: 60,
        comments: []
      },
      {
        taskNumber: 3,
        title: "Client Follow-up",
        description: "Send follow-up email to potential clients.",
        date: "2025-08-16",
        dueDate: "2025-08-22",
        category: "Client Relations",
        priority: "low",
        active: false,
        newTask: false,
        completed: false,
        failed: false,
        timeSpent: 30,
        comments: []
      },
    ],
  },
  {
    id: 2,
    firstname: "Ishita",
    email: "employee2@example.com",
    password: "123",
    phone: "+1-555-0456",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    department: "IT",
    position: "Frontend Developer",
    joinDate: "2023-03-20",
    taskCount: 3,
    taskSummary: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        taskNumber: 1,
        title: "Update Website",
        description: "Revamp homepage layout and add new product banners.",
        date: "2025-08-19",
        dueDate: "2025-08-30",
        category: "Development",
        priority: "high",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        timeSpent: 240,
        comments: []
      },
      {
        taskNumber: 2,
        title: "Bug Fixing",
        description: "Resolve reported issues from the QA team.",
        date: "2025-08-15",
        dueDate: "2025-08-20",
        category: "Development",
        priority: "medium",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        timeSpent: 180,
        comments: []
      },
      {
        taskNumber: 3,
        title: "Code Review",
        description: "Review pull requests from junior developers.",
        date: "2025-08-14",
        dueDate: "2025-08-16",
        category: "Code Review",
        priority: "low",
        active: false,
        newTask: false,
        completed: false,
        failed: false,
        timeSpent: 45,
        comments: []
      },
    ],
  },
  {
    id: 3,
    firstname: "Rohan",
    email: "employee3@example.com",
    password: "123",
    phone: "+1-555-0789",
    address: "789 Pine Rd, Chicago, IL 60614",
    department: "Marketing",
    position: "Marketing Specialist",
    joinDate: "2023-06-10",
    taskCount: 3,
    taskSummary: {
      newTask: 1,
      active: 1,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        taskNumber: 1,
        title: "Marketing Campaign",
        description: "Launch new social media advertisement campaign.",
        date: "2025-08-21",
        dueDate: "2025-08-28",
        category: "Marketing",
        priority: "high",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        timeSpent: 90,
        comments: []
      },
      {
        taskNumber: 2,
        title: "SEO Optimization",
        description: "Improve search ranking for landing pages.",
        date: "2025-08-18",
        dueDate: "2025-08-25",
        category: "Marketing",
        priority: "medium",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        timeSpent: 150,
        comments: []
      },
      {
        taskNumber: 3,
        title: "Content Creation",
        description: "Write 5 new blog posts for website.",
        date: "2025-08-14",
        dueDate: "2025-08-21",
        category: "Content",
        priority: "low",
        active: false,
        newTask: false,
        completed: false,
        failed: false,
        timeSpent: 75,
        comments: []
      },
    ],
  },
];

const admin = [
  {
    id: 1,
    firstname: "Admin",
    email: "admin@example.com",
    password: "123",
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return { employees, admin };
};
