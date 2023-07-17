import {Router} from "express";
import { submitForm } from "../controller/form.js";

export const submitFormRoute = Router().post("/",submitForm);