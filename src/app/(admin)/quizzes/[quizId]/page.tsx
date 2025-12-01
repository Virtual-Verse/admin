"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQuiz } from "../data/queries";
import { updateQuiz } from "../data/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import Link from "next/link";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
};

export default function QuizBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Convert the URL param to a number safely
  const quizId = Number(params.quizId);

  // 1. Fetch the SPECIFIC quiz by ID
  const { data: currentQuiz, isLoading, isError } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz(quizId),
    enabled: !!quizId && !isNaN(quizId),
  });

  // 2. Local State for the Builder
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load existing questions when quiz data arrives
  useEffect(() => {
    if (currentQuiz?.content && typeof currentQuiz.content === 'object') {
      // @ts-ignore
      if (currentQuiz.content.questions) {
        // @ts-ignore
        setQuestions(currentQuiz.content.questions);
      }
    }
  }, [currentQuiz]);

  // 3. Mutation to Save
  const updateMutation = useMutation({
    mutationFn: updateQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      alert("Quiz saved successfully!");
    },
    onError: (err: any) => alert("Failed to save: " + err.message),
  });

  // --- ACTIONS ---
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionTextChange = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = text;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswerIndex = optionIndex;
    setQuestions(newQuestions);
  };

  const handleSaveQuiz = () => {
    if (questions.some(q => !q.text || q.options.some(o => !o))) {
      alert("Please fill in all question text and options.");
      return;
    }

    const contentJson = {
      questions: questions
    };

    updateMutation.mutate({
      id: quizId,
      data: {
        title: currentQuiz?.title || "Untitled",
        // @ts-ignore
        content: contentJson
      }
    });
  };

  // --- RENDER ---
  if (isLoading) return <div className="p-8">Loading Quiz...</div>;
  if (isError || !currentQuiz) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Quiz not found or error loading data</h2>
          <p className="text-muted-foreground mb-4">
            {isError ? "There was an error loading the quiz. Please check:" : "Quiz not found."}
          </p>
          {isError && (
            <ul className="text-sm text-muted-foreground text-left max-w-md mx-auto mb-4">
              <li>• Is the backend server running on http://localhost:3000?</li>
              <li>• Is the quiz ID ({quizId}) valid?</li>
              <li>• Check the browser console for more details</li>
            </ul>
          )}
          <Link href="/quizzes">
            <Button variant="outline">Back to Quizzes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/quizzes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
            <p className="text-muted-foreground">Question Builder</p>
          </div>
        </div>
        <Button onClick={handleSaveQuiz} disabled={updateMutation.isPending}>
          <Save className="mr-2 h-4 w-4" />
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((question, qIndex) => (
          <Card key={question.id} className="relative">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteQuestion(qIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Question Text */}
              <div className="space-y-2">
                <Label>Question Text</Label>
                <Input
                  placeholder="Enter the question here..."
                  value={question.text}
                  onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <Label>Options (Select the correct answer)</Label>
                <RadioGroup
                  value={question.correctAnswerIndex.toString()}
                  onValueChange={(val) => handleCorrectAnswerChange(qIndex, parseInt(val))}
                >
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center space-x-3">
                      <RadioGroupItem value={oIndex.toString()} id={`q${question.id}-opt${oIndex}`} />
                      <Input
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className={question.correctAnswerIndex === oIndex ? "border-green-500 ring-1 ring-green-500" : ""}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {questions.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">No questions added yet.</p>
            <Button onClick={handleAddQuestion}>Add First Question</Button>
          </div>
        )}

        {/* Add Button at Bottom */}
        {questions.length > 0 && (
          <Button variant="outline" className="w-full py-8 border-dashed" onClick={handleAddQuestion}>
            <Plus className="mr-2 h-4 w-4" />
            Add Another Question
          </Button>
        )}
      </div>
    </div>
  );
}

