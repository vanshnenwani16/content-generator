"use client"
import React, { useState } from 'react';
import { TEMPLATE } from '../../_components/Template';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';


interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput:any,
  loading:boolean
}

function FormSection({ selectedTemplate,userFormInput,loading }:PROPS) {
  const [formData,setFormData] = useState<any>();
  const handleInputChange = (event:any)=>{
      const {name,value}=event.target;
      setFormData({...formData,[name]:value})
  }
  const onSubmit=(e:any)=>{
    e.preventDefault();
    userFormInput(formData)
  }
  return (
    <div className='p-5 shadow-md border rounded-lg  bg-white'>
      <img src={selectedTemplate?.icon} alt="icon" width={70} height={70} />

      <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
      <form onSubmit={onSubmit} className='mt-6'>
        {selectedTemplate?.form?.map((item,index)=>(
            <div className='my-2 flex flex-col gap-2 mb-7'>
              <label className='font-bold'>{item.label}</label>
              {item.field=='input'?
              <Input name={item.name} required={item.required} onChange={handleInputChange} />
              :item.field=='textarea'?
              <Textarea name={item.name} required={item.required} onChange={handleInputChange} />:null
            }
            </div>
        ))}
        <Button disabled={loading}  type='submit' className='w-full py-6'>{loading&&<Loader className='animate-spin '/>}Generate Content</Button>
      </form>
    </div>
  );
};

export default FormSection;
