import { Button } from "@/components/ui/button";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import CustomDropdownMenu from "../DropdownMenu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function Toolbar({ table, actions, searchKey = "email" }: any) {
  return (
    <div className="flex items-center py-4 justify-between">
      <div className="flex items-center gap-4">
        <Input
          placeholder={`Search by ${searchKey}...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="w-64"
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <CustomDropdownMenu
            button={
              <Button variant="outline" className="ml-auto">
                Actions <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            }
          >
            {actions.map((column: any, i: number) => {
              return (
                <DropdownMenuCheckboxItem
                  key={i}
                  className="capitalize"
                  onClick={column.onClick}
                >
                  {column.name}
                </DropdownMenuCheckboxItem>
              );
            })}
          </CustomDropdownMenu>
        )}
      </div>
      <CustomDropdownMenu
        button={
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        }
      >
        {table
          .getAllColumns()
          .filter((column: any) => column.getCanHide())
          .map((column: any) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </CustomDropdownMenu>
    </div>
  );
}
