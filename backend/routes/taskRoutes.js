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
  getSingleTaskList,
  terminateDomain,
  getAllUsersTaskCreatedStats
  
} from "../controllers/taskController.js";

const router = express.Router();

import upload from "../middleware/multer.js";



router.post("/tasks", authorize(['Admin', 'Sales', 'Manager','SuperAdmin']), upload.fields([
  { name: "sowFile", maxCount: 10 },
  { name: "inputFile", maxCount: 10 },
  { name: "clientSampleSchemaFiles", maxCount: 20 },
]), createTask);

router.get("/tasks/list",authorize(['Admin', 'Sales', 'Manager','SuperAdmin']), getTaskList);


router.get("/tasks/:id/reopen-data",
  authorize(['Admin', 'Sales', 'Manager','SuperAdmin']),
  getReopenTaskData
);


router.put("/tasks/:id/reopen",upload.fields([{ name: "sowFile", maxCount: 20 }]), authorize(['Admin', 'Sales', 'Manager','SuperAdmin']), reOpenTask);

router.put(
  "/tasks/domain-status",
  authorize(['TL', 'Manager', 'Admin','SuperAdmin']),
  upload.single('file'),
  updateTaskDomainStatus
);
router.put(
  "/tasks/:id",
  authorize(['Admin', 'Sales', 'TL', 'Manager','SuperAdmin']),
  upload.fields([
    { name: "sowFile", maxCount: 10 },
    { name: "inputFile", maxCount: 10 },
    { name: "clientSampleSchemaFile", maxCount: 20 },
    { name: "outputFiles", maxCount: 20 },
  ]),
  updateTask
);

router.post("/tasks/:id/submit", authorize(['Admin', 'TL', 'Developer', 'Manager','SuperAdmin']), upload.fields([
  { name: "outputFiles", maxCount: 20 },
]), submitTask);

router.post(
  "/tasks/:id/edit-submission",

  authorize(['Admin', 'TL', 'Developer', 'Manager','SuperAdmin']),
  upload.fields([
    { name: "outputFiles", maxCount: 20 },
    { name: "newOutputFiles", maxCount: 20 }
  ]),
  editDomainSubmission
);

router.get("/tasks/developers", authorize(['Manager', 'Admin', 'TL','SuperAdmin']), getDevelopersDomainStatus);
router.get("/tasks/stats", authorize(['Admin', 'Sales', 'TL', 'Developer', 'Manager','SuperAdmin']), getDomainStats);
router.get("/tasks", authorize(['Admin', 'Sales', 'TL', 'Developer', 'Manager','SuperAdmin']), developerOnly, getTask);
router.get(
  "/tasks/:id/domain/:domainName",
  authorize(['Admin', 'Sales', 'TL', 'Developer', 'Manager','SuperAdmin']),
  getTaskDomain
);

router.get("/tasks/:id", authorize(['Admin', 'Sales', 'TL', 'Developer', 'Manager','SuperAdmin']), getSingleTask);
// TL and Manager can update domain status
router.get("/tasks/single/:id",authorize(['Admin', 'Sales', 'TL', 'Manager','SuperAdmin']), getSingleTaskList);


router.get("/tasks/developers", authorize(['Manager', 'TL','SuperAdmin']), getDevelopersDomainStatus);
router.get("/tasks/created/by-all-users", authorize(['Manager', 'Sales','Admin','SuperAdmin']), getAllUsersTaskCreatedStats);

router.put("/tasks/domain/terminate", authorize([ 'Manager', 'Admin','SuperAdmin','TL']), terminateDomain);


export default router;


