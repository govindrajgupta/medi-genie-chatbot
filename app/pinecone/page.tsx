"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { DatabaseIcon, LucideLoader2, MoveUp, RefreshCcw } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const VectorDBPage = (props: Props) => {
    const [isUplaoding, setIsUplaoding] = useState(false)
    const [indexname, setIndexName] = useState("")
    const [namespace, setNameSpace] = useState("")
    const onStartUpload = async () => {
        const response = await fetch('api/updatedatabase', { method: 'POST', body: JSON.stringify({
            indexname, 
            namespace
        })})
        console.log(response);
        // await processStreamedProgress(response);

    }
  return (
    <main className='felx flex-col items-center justify-center min-h-screen p-24'>
        <Card>
            <CardHeader>
                <CardTitle>Update Knowledge Base</CardTitle>
                <CardDescription>Add new documents to your vector DB</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-2 grid gap-4 border rounded-lg p-6'>
                        <div className='gap-4 relative'>
                            <Button className='absolute -right-4 -top-4' variant={'ghost'} size={'icon'}>
                                <RefreshCcw />
                            </Button>
                            <Label>Files list:</Label>
                            <Textarea readOnly className='min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground'/>

                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className="grid gap-2"><Label>
                                Index Name
                                </Label>
                                <Input value={indexname} onChange={e => setIndexName(e.target.value)} placeholder='index name' disabled={isUplaoding} className='disabled:cursor-default'/>
                                </div>
                            <div className="grid gap-2">
                                <Label>
                                Name Space
                                </Label>
                                <Input value={namespace} onChange={e => setNameSpace(e.target.value)} placeholder='namespace' disabled={isUplaoding} className='disabled:cursor-default'/>
                            </div>

                        </div>

                    </div>
                    <Button onClick={onStartUpload} variant={'outline'} disabled={isUplaoding} className='w-full h-full'>
                        <span className='flex flex-row'>

                        <DatabaseIcon size={200} className='stroke-[#D90013]'/>
                        <MoveUp className='stroke-[#D90013]'/>
                        </span>
                    </Button>

                </div>
                {isUplaoding && <div className='mt-4'>
                    <Label>Upload files:</Label>
                    <div className='flex flex-row items-center gap-4'>
                        <Progress value={80}/>
                        <LucideLoader2 className='stroke-[#D90013] animate-spin'/>
                        
                    </div>

                </div>}
            </CardContent>
        </Card>

    </main>
  )
}

export default VectorDBPage