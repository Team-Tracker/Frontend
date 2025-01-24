"use client";

import Link from "next/link";
import { Flex } from "@chakra-ui/react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

import { useMenu } from "../teams/[teamid]/MenuContext";

const TeamsMenuBar = () => {
  const { selectedAction, setSelectedAction } = useMenu();
  console.log("Selection: ", selectedAction.enableTasks);


  const handleCheckBoxToogle = (action, checked) => {
    // console.log(`${action}: ${checked}`);

    const isChecked = typeof checked === "object" ? !!checked.checked : !!checked;

    setSelectedAction((prev) => ({
      ...prev,
      [action]: isChecked,
    }));
    // console.log("Logging: ", selectedAction)
  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Flex gap={4} align={"flex-start"}>
          <Link href="/teams" className="text-white text-lg font-semibold hover:text-gray-300">
            Go back
          </Link>

          <MenuRoot closeOnSelect={false}>
            <MenuTrigger asChild>
              <Button variant="outline" size="sm">
                View
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="currentTask">
                <Checkbox 
                  value = "currentTask"
                  checked = {selectedAction.enableTasks}
                  onCheckedChange = {(event) => handleCheckBoxToogle("enableTasks", event)}
                >
                  Show Tasks
                </Checkbox>
              </MenuItem>
              <MenuItem value="teamchat">
                <Checkbox 
                  value = "teamchat"
                  checked = {selectedAction.enableChat}
                  onCheckedChange = {(event) => handleCheckBoxToogle("enableChat", event)}
                >
                  Teamchat
                </Checkbox>
              </MenuItem>
              <MenuItem value="memberlist">
                <Checkbox 
                  value = "memberlist"
                  checked = {selectedAction.enableMemberList}
                  onCheckedChange = {(event) => handleCheckBoxToogle("enableMemberList", event)}
                >
                  Memberlist
                </Checkbox>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Flex>
      </div>
    </nav>
  );
};

export default TeamsMenuBar;
