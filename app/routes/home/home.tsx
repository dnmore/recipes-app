import type { Route } from "../+types/home";
import { Welcome } from "../../components/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyDish | Recipes, How-Tos and More" },
    { name: "description", content: "Welcome to MyDish!" },
  ];
}

export default function Home() {
  return  <Welcome />
    
   
}
