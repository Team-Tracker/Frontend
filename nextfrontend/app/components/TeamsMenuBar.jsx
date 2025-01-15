import Link from "next/link"

import { CheckboxGroup, Fieldset } from "@chakra-ui/react"
import { Checkbox } from "@/components/ui/checkbox"

const TeamsMenuBar = () => {
    return (
        <div className="MenuBar">
            <nav className="bg-gray-800 p-4 shadow-lg top-0 left-0 w-full z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-white text-lg font-semibold po hover:text-gray-300">
                        Home
                    </Link>
                    <Fieldset.Root>
                        <CheckboxGroup defaultValue={["react"]} name="framework">
                            <Fieldset.Legend fontSize="sm" mb="2">
                                Select framework
                            </Fieldset.Legend>
                            <Fieldset.Content>
                                <Checkbox value="react">React</Checkbox>
                                <Checkbox value="svelte">Svelte</Checkbox>
                                <Checkbox value="vue">Vue</Checkbox>
                                <Checkbox value="angular">Angular</Checkbox>
                            </Fieldset.Content>
                        </CheckboxGroup>
                    </Fieldset.Root>
                </div>
            </nav>
        </div>
    );
}

export default TeamsMenuBar;
