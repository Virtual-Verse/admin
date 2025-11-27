// src/app/(dashboard)/families/components/family-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { familyFormSchema, FamilyFormValues } from "@/app/(dashboard)/families/data/schema";
import { Family } from "../data/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Loader2 } from "lucide-react";

interface FamilyFormProps {
  onSubmit: (values: FamilyFormValues) => void;
  isSubmitting: boolean;
  initialData?: Family; // <-- Make it possible to pass in initial data
}

export function FamilyForm({ onSubmit, isSubmitting, initialData }: FamilyFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FamilyFormValues>({
    resolver: zodResolver(familyFormSchema),
    defaultValues: initialData || { familyName: "", password: "" },
  });

  // This useEffect ensures the form resets when the initialData changes
  // (e.g., when you open the modal for a different family)
  useEffect(() => {
    if (initialData) {
      form.reset({ familyName: initialData.familyName, password: "" });
    } else {
      form.reset({ familyName: "", password: "" });
    }
  }, [initialData, form]);

  const formTitle = initialData ? "Save Changes" : "Create Family";
  const submittingTitle = initialData ? "Saving..." : "Creating...";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
        <FormField
          control={form.control}
          name="familyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Name</FormLabel>
              <FormControl>
                <Input placeholder="The Smith Family" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                {/* --- 4. Wrap Input in a relative div to position the icon --- */}
                <div className="relative">
                  <Input
                    // Toggle type based on state
                    type={showPassword ? "text" : "password"}
                    placeholder={initialData ? "Leave blank to keep unchanged" : "********"}
                    {...field}
                    autoComplete="new-password"
                    className="pr-10" // Add padding to the right so text doesn't go under the icon
                  />
                  <Button
                    type="button" // IMPORTANT: Prevents the form from submitting when clicking the eye
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {/* --- End Wrapper --- */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#516e56] hover:bg-[#516e56]/90 text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            initialData ? "Update Family" : "Create Family"
          )}
        </Button>
      </form>
    </Form>
  );
}
