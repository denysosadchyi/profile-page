import { useState, type FormEvent } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Profile = {
  name: string
  email: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function App() {
  const [profile, setProfile] = useState<Profile>({
    name: "Олена Коваль",
    email: "olena.koval@example.com",
  })
  const [draft, setDraft] = useState<Profile>(profile)
  const [saved, setSaved] = useState(false)

  const isChanged =
    draft.name !== profile.name || draft.email !== profile.email

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setProfile({ name: draft.name.trim(), email: draft.email.trim() })
    setSaved(true)
  }

  function updateDraft(field: keyof Profile, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  return (
    <main className="flex min-h-svh items-start justify-center bg-muted/40 px-4 py-10 sm:py-16">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Профіль</CardTitle>
          <CardDescription>
            Ваші особисті дані в кабінеті
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg font-medium">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-base font-medium">{profile.name}</p>
              <p className="truncate text-sm text-muted-foreground">
                {profile.email}
              </p>
            </div>
          </div>

          <Separator />

          <form id="profile-form" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Ім’я</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={draft.name}
                  onChange={(e) => updateDraft("name", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Пошта</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={draft.email}
                  onChange={(e) => updateDraft("email", e.target.value)}
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="justify-end gap-3">
          {saved && (
            <span className="text-sm text-muted-foreground" role="status">
              Зміни збережено
            </span>
          )}
          <Button type="submit" form="profile-form" disabled={!isChanged}>
            Зберегти
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default App
