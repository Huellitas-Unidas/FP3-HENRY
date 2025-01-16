"use client";

import React from "react";
import Donations from "@/components/Donations/Donations";
import { IUserSessionDt } from "@/interfaces/types";


const DonationsPage = () => {
  const userSession: IUserSessionDt | null = null;

  return <Donations userSession={userSession} />;
};

export default DonationsPage;









