import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import CreateEventDialog from "../events/CreateEventDialog";

const Navigation = () => {
  return (
    <>
      <div className="w-full flex flex-col py-2">
        <div className="text-2xl font-bold text-center">Pulipaka</div>
        {/* <NavigationMenu className="ml-auto pr-12 w-max ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <CreateEventDialog />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
      </div>
    </>
  );
};

export default Navigation;
