import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

export default function Form2Page() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">User Registration</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Choose a username" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm password" />
          </div>

          <div className="space-y-3">
            <Label>Account Type</Label>
            <RadioGroup defaultValue="personal">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal">Personal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">Business</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enterprise" id="enterprise" />
                <Label htmlFor="enterprise">Enterprise</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Preferences</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <Label htmlFor="marketing" className="text-sm">
                  Receive marketing emails
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="updates" />
                <Label htmlFor="updates" className="text-sm">
                  Product updates
                </Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-sm">
              Enable notifications
            </Label>
            <Switch id="notifications" />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Create Account
            </Button>
            <Button type="button" variant="secondary">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
