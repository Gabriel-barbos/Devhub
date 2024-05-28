'use client'

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { ForgetPasswordDialog } from "@/components/login-page/forget-password-dialog";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profile } from 'console';
import { JwtPayload } from 'jwt-decode';

// Open IndexedDB database
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("devhub", 1);

    request.onerror = function(event) {
      reject("Error opening database.");
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore("tokens", { keyPath: "token" });
    };
  });
}

// Save token to IndexedDB
async function saveTokenToDB(token) {
  const db = await openDB();
  const transaction = db.transaction(["tokens"], "readwrite");
  const store = transaction.objectStore("tokens");
  const request = store.add({ token: token });
  
  request.onerror = function(event) {
    console.error("Error saving token to database.");
  };
}

const UserLogin = z.object({
  username: z.string().email({message: "Email inválido"}),
  password: z.string(),
});

export function LoginForm() {
  const {toast} = useToast();
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const form = useForm<z.infer<typeof UserLogin>>({
    resolver: zodResolver(UserLogin),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof UserLogin>) => {
    const formData = new URLSearchParams();
    formData.append('grant_type', '');
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('scope', '');
    formData.append('client_id', '');
    formData.append('client_secret', '');

    try {
      UserLogin.parse(values);
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      });

      if(response.ok) {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.token);
        saveTokenToDB(data.token); // Save token to IndexedDB
        const decodedToken = jwtDecode(data.token);
        router.push(`${decodedToken.username}`);
        setFormSubmitted(true);
      }

      if(response.status === 401) throw new Error('Senha inválida.');
      if(response.status === 404) throw new Error('Conta não encontrada, verifique se seu email está escrito corretamente.');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message
      });
      console.log(error);
    }
  };

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" required {...field} />
              </FormControl>
              <FormDescription>
                Insira seu email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="" type="password" required {...field} />
              </FormControl>
              <FormDescription>
                Insira sua senha
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center">
          <Button type="submit" className="w-[100px]">
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
