import Link from "next/link";
import { CheckboxGroup, Fieldset, Select, SelectItem } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

const TeamsMenuBar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-white text-lg font-semibold hover:text-gray-300">
          Home
        </Link>

        {/* Framework Selection */}
        <div className="relative">
          <Select placeholder="Select framework">
            <SelectItem value="react">
              <CheckboxGroup defaultValue={["react"]} name="framework">
                <Fieldset.Legend fontSize="sm" mb="2">
                  Select framework
                </Fieldset.Legend>
                <Fieldset.Content className="space-y-1">
                  <Checkbox value="react">React</Checkbox>
                  <Checkbox value="svelte">Svelte</Checkbox>
                  <Checkbox value="vue">Vue</Checkbox>
                  <Checkbox value="angular">Angular</Checkbox>
                </Fieldset.Content>
              </CheckboxGroup>
            </SelectItem>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default TeamsMenuBar;
