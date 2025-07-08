import { v4 as uuidv4 } from "uuid";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { IUser } from "@/Auth/models/user.models";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getRandomColor } from "@/lib/utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    const id = uuidv4()
    const user: IUser = {
      color: getRandomColor(),
      id: id,
      name: loginForm.username,
      userId:id,
      userName: loginForm.username 
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user })
    );
    navigate({
      to: "/",
    });
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div>
        <Card className="border-0">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              <div>
                <Label htmlFor="username">User Name</Label>
                <Input
                  id="username"
                  className="pt-2"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="password">User Name</Label>
                <Input
                  id="password"
                  className="pt-2"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="justify-self-end pt-2">
              <Button onClick={handleSubmit}>Login</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
