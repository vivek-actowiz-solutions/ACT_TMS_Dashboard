import express from "express";
import { authorize, developerOnly } from "../middleware/Autho.js";


import {
  createTask,
  getTask,
  updateTask,
  submitTask,
  getSingleTask,
  updateTaskDomainStatus,
  getDevelopersDomainStatus,
  getDomainStats,
  editDomainSubmission,
  getTaskDomain,
  reOpenTask,
  getReopenTaskData,
  getTaskList,
  getSingleTaskList
} from "../controllers/taskController.js";

const router = express.Router();

import upload from "../middleware/multer.js";



router.post("/tasks", authorize(['Admin', 'Sales', 'Manager']), upload.fields([
  { name: "sowFile", maxCount: 10 },
  { name: "inputFile", maxCount: 10 },
  { name: "clientSampleSchemaFiles", maxCount: 20 },
]), createTask);

router.get("/tasks/list", getTaskList);




router.get("/tasks/:id/reopen-data",
  authorize(['Admin', 'Sales', 'Manager']),
  getReopenTaskData
);


router.put("/tasks/:id/reopen",upload.fields([{ name: "sowFile", maxCount: 20 }]), authorize(['Admin', 'Sales', 'Manager']), reOpenTask);

router.put(
  "/tasks/domain-status",
  authorize(['TL', 'Manager', 'Admin']),
  upload.single('file'),
  updateTaskDomainStatus
);
router.put(
  "/tasks/:id",
  authorize(['Admin', 'Sales', 'TL', 'Manager']),
  upload.fields([
    { name: "sowFile", maxCount: 10 },
    { name: "inputFile", maxCount: 10 },
    { name: "clientSampleSchemaFile", maxCount: 20 },
    { name: "outputFiles", maxCount: 20 },
  ]),
  updateTask
);

router.post("/tasks/:id/submit", authorize(['Admin', 'TL', 'Developer', 'Manager']), upload.fields([
  { name: "outputFiles", maxCount: 20 },
]), submitTask);

router.post(
  "/tasks/:id/edit-submission",

  authorize(['Admin', 'TL', 'Developer', 'Manager']),
  upload.fields([
    { name: "outputFiles", maxCount: 20 },
    { name: "newOutputFiles", maxCount: 20 }
  ]),
  editDomainSubmission
);

router.get("/tasks/developers", authorize(['Manager', 'Admin', 'TL']), getDevelopersDomainStatus);
router.get("/tasks/stats", authorize(['Admin', 'Sales', 'TL', 'Developer', 'Manager']), getDomainStats);
router.get("/tasks", authorize(['Admin', 'Sales', 'TL', 'Developer', 'Manager']), developerOnly, getTask);
router.get(
  "/tasks/:id/domain/:domainName",
  authorize(['Admin', 'Sales', 'TL', 'Developer', 'Manager']),
  getTaskDomain
);

router.get("/tasks/:id", authorize(['Admin', 'Sales', 'TL', 'Developer', 'Manager']), getSingleTask);
// TL and Manager can update domain status
router.get("/tasks/single/:id", getSingleTaskList);


router.get("/tasks/developers", authorize(['Manager', 'TL',]), getDevelopersDomainStatus);
export default router;


