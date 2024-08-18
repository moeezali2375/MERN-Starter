import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const PwdInput = ({
  id,
  name = "Password",
  pwd,
  setPwd,
  match = 0,
  placeholder = "Insta Password",
  dialog = 0,
}) => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  return (
    <>
      {dialog === 0 ? (
        <>
          <Label htmlFor={id}>{name}</Label>
          <div className="relative select-none">
            <Input
              type={isPwdVisible ? "text" : "password"}
              id={id}
              placeholder={placeholder}
              required
              minLength={4}
              autoComplete="off"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className={`block w-full px-3 py-2 pr-10 border rounded-md focus:outline-none ${
                match === 1
                  ? "border-green-500"
                  : match === 2
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 "
              onMouseDown={() => setIsPwdVisible(true)}
              onMouseUp={() => setIsPwdVisible(false)}
              onTouchStart={() => setIsPwdVisible(true)}
              onTouchEnd={() => setIsPwdVisible(false)}
            >
              {isPwdVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </>
      ) : (
        <>
          <Label htmlFor={id} className="text-right">
            {name}
          </Label>
          <div className="relative select-none col-span-3">
            <Input
              type={isPwdVisible ? "text" : "password"}
              id={id}
              placeholder={placeholder}
              required
              minLength={4}
              autoComplete="off"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className={`block w-full px-3 py-2 pr-10 border rounded-md focus:outline-none ${
                match === 1
                  ? "border-green-500"
                  : match === 2
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 "
              onMouseDown={() => setIsPwdVisible(true)}
              onMouseUp={() => setIsPwdVisible(false)}
              onTouchStart={() => setIsPwdVisible(true)}
              onTouchEnd={() => setIsPwdVisible(false)}
            >
              {isPwdVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PwdInput;
