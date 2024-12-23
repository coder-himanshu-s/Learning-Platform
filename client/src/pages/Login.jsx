import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [loginInput ,setLoginInput] = useState({email:"",password:""});
  const [signupInput ,setsignupInput] = useState({name:"",email:"",password:""});

   const changeInputHandler = (e,type)=>{
      const { name,value} = e.target;
      if( type === "signup" ){
        setsignupInput({...signupInput,[name]:value});
      }
      else{
        setLoginInput({...loginInput,[name]:value});
      }
   } ;

   const handleRegistration = (type)=>{
    
    if( type === "signup"){
      console.log(signupInput);

    }else{
      console.log(loginInput);
    }
    
   }
  return (
    <div className="flex items-center w-full justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Log In</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input 
                      type=" text"
                       id="name" 
                       name="name" 
                       value={signupInput.name} 
                       placeholder="Enter you name" 
                       onChange={ (e)=>changeInputHandler(e,"signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  required="true"
                  id="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="Enter your email"
                  onChange={ (e)=>changeInputHandler(e,"signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  required="true"
                  id="password"
                  name="password"
                  value={signupInput.password}
                  placeholder="Enter password"
                  onChange={ (e)=>changeInputHandler(e,"signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=>{handleRegistration("signup")}}>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>
                Login your password here. After signup you will be logged
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email "
                  required="true"
                  name="email"
                  value={loginInput.email}
                  onChange={ (e)=>changeInputHandler(e,"login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  required="true"
                  name="password"
                  value={loginInput.password}
                  onChange={ (e)=>changeInputHandler(e,"login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=>{handleRegistration("login")}}>Log In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
