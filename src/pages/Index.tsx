import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, CreditCard } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface BusinessCardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  theme: string;
}

const themes = {
  classic: {
    bg: 'bg-white',
    text: 'text-gray-800',
    accent: 'text-blue-600',
    border: 'border-gray-200'
  },
  modern: {
    bg: 'bg-gradient-to-br from-slate-900 to-slate-700',
    text: 'text-white',
    accent: 'text-cyan-400',
    border: 'border-slate-600'
  },
  elegant: {
    bg: 'bg-gradient-to-br from-purple-900 to-purple-700',
    text: 'text-white',
    accent: 'text-purple-200',
    border: 'border-purple-500'
  },
  professional: {
    bg: 'bg-gradient-to-br from-gray-800 to-gray-600',
    text: 'text-white',
    accent: 'text-yellow-400',
    border: 'border-gray-500'
  },
  minimalist: {
    bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
    text: 'text-gray-900',
    accent: 'text-gray-600',
    border: 'border-gray-300'
  },
  corporate: {
    bg: 'bg-gradient-to-br from-blue-900 to-blue-800',
    text: 'text-white',
    accent: 'text-blue-200',
    border: 'border-blue-600'
  },
  creative: {
    bg: 'bg-gradient-to-br from-pink-500 to-orange-400',
    text: 'text-white',
    accent: 'text-pink-100',
    border: 'border-pink-300'
  },
  luxury: {
    bg: 'bg-gradient-to-br from-amber-900 to-yellow-800',
    text: 'text-white',
    accent: 'text-amber-200',
    border: 'border-amber-600'
  },
  nature: {
    bg: 'bg-gradient-to-br from-green-800 to-green-600',
    text: 'text-white',
    accent: 'text-green-200',
    border: 'border-green-500'
  },
  ocean: {
    bg: 'bg-gradient-to-br from-blue-600 to-teal-500',
    text: 'text-white',
    accent: 'text-blue-100',
    border: 'border-blue-400'
  },
  sunset: {
    bg: 'bg-gradient-to-br from-red-500 to-yellow-500',
    text: 'text-white',
    accent: 'text-red-100',
    border: 'border-red-400'
  },
  monochrome: {
    bg: 'bg-black',
    text: 'text-white',
    accent: 'text-gray-300',
    border: 'border-gray-700'
  }
};

export default function BusinessCardGenerator() {
  const [cardData, setCardData] = useState<BusinessCardData>({
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    website: 'www.johndoe.com',
    address: '123 Tech Street, Silicon Valley, CA',
    theme: 'classic'
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof BusinessCardData, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const downloadAsPNG = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        width: 400,
        height: 240
      });
      
      const link = document.createElement('a');
      link.download = `${cardData.name.replace(/\s+/g, '_')}_business_card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };

  const downloadAsPDF = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        width: 400,
        height: 240
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', [89, 51]); // Standard business card size
      pdf.addImage(imgData, 'PNG', 0, 0, 89, 51);
      pdf.save(`${cardData.name.replace(/\s+/g, '_')}_business_card.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const currentTheme = themes[cardData.theme as keyof typeof themes];

  return (
    <div className="min-h-screen bg-white p-8" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      <div className="max-w-6xl mx-auto bg-white border-2 border-black p-8">
        <div className="text-center mb-12 border-b-2 border-black pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 border-2 border-black bg-black">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black uppercase tracking-wider">
              Business Card Generator
            </h1>
          </div>
          <p className="text-black text-base font-bold uppercase tracking-wide">
            Create professional business cards and download them instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="h-fit border-2 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
            <CardHeader className="pb-6 border-b-2 border-black bg-gray-100">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-black uppercase tracking-wide">
                <div className="p-1 border border-black bg-black">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                Card Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-2 p-4 border-2 border-black bg-gray-50">
                <Label htmlFor="name" className="font-bold text-black uppercase text-xs tracking-wide">Full Name</Label>
                <Input
                  id="name"
                  value={cardData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="border-2 border-black font-bold"
                />
              </div>

              <div className="grid gap-2 p-4 border-2 border-black bg-gray-50">
                <Label htmlFor="title" className="font-bold text-black uppercase text-xs tracking-wide">Job Title</Label>
                <Input
                  id="title"
                  value={cardData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your job title"
                  className="border-2 border-black font-bold"
                />
              </div>

              <div className="grid gap-2 p-4 border-2 border-black bg-gray-50">
                <Label htmlFor="company" className="font-bold text-black uppercase text-xs tracking-wide">Company</Label>
                <Input
                  id="company"
                  value={cardData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enter company name"
                  className="border-2 border-black font-bold"
                />
              </div>

              <div className="h-2 bg-black"></div>

              <div className="grid gap-2 p-4 border-2 border-black bg-gray-50">
                <Label htmlFor="phone" className="font-bold text-black uppercase text-xs tracking-wide">Phone Number</Label>
                <Input
                  id="phone"
                  value={cardData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  className="border-2 border-black font-bold"
                />
              </div>

              <div className="grid gap-2 p-4 border-2 border-black bg-gray-50">
                <Label htmlFor="email" className="font-bold text-black uppercase text-xs tracking-wide">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={cardData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className="border-2 border-black font-bold"
                />
              </div>

              <div className="grid gap-2 p-4 border-2 border-black bg-gray-50">
                <Label htmlFor="website" className="font-bold text-black uppercase text-xs tracking-wide">Website</Label>
                <Input
                  id="website"
                  value={cardData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="Enter website URL"
                  className="border-2 border-black font-bold"
                />
              </div>

              <div className="grid gap-2 p-4 border-2 border-black bg-gray-50">
                <Label htmlFor="address" className="font-bold text-black uppercase text-xs tracking-wide">Address</Label>
                <Input
                  id="address"
                  value={cardData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter business address"
                  className="border-2 border-black font-bold"
                />
              </div>

              <div className="h-2 bg-black"></div>

              <div className="grid gap-2 p-4 border-2 border-black bg-gray-50">
                <Label htmlFor="theme" className="font-bold text-black uppercase text-xs tracking-wide">Theme</Label>
                <Select
                  value={cardData.theme}
                  onValueChange={(value) => handleInputChange('theme', value)}
                >
                  <SelectTrigger className="border-2 border-black font-bold">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-black">
                    <SelectItem value="classic">Classic White</SelectItem>
                    <SelectItem value="modern">Modern Dark</SelectItem>
                    <SelectItem value="elegant">Elegant Purple</SelectItem>
                    <SelectItem value="professional">Professional Gray</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="corporate">Corporate Blue</SelectItem>
                    <SelectItem value="creative">Creative Gradient</SelectItem>
                    <SelectItem value="luxury">Luxury Gold</SelectItem>
                    <SelectItem value="nature">Nature Green</SelectItem>
                    <SelectItem value="ocean">Ocean Blue</SelectItem>
                    <SelectItem value="sunset">Sunset Orange</SelectItem>
                    <SelectItem value="monochrome">Monochrome Black</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t-4 border-black pt-6 mt-6 bg-gray-100 p-4">
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={downloadAsPNG} 
                    className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-bold uppercase tracking-wide border-2 border-black shadow-[4px_4px_0px_0px_#666]"
                  >
                    <Download className="h-4 w-4" />
                    Download PNG
                  </Button>
                  <Button 
                    onClick={downloadAsPDF} 
                    variant="outline" 
                    className="flex items-center gap-2 border-2 border-black bg-white text-black hover:bg-gray-100 px-8 py-3 text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_#666]"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview and Download */}
          <div className="space-y-8">
            <Card className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
              <CardHeader className="pb-6 border-b-2 border-black bg-gray-100">
                <CardTitle className="text-lg font-bold text-black uppercase tracking-wide">Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="scale-125 origin-center">
                  <div
                    ref={cardRef}
                    className={`
                      w-80 h-48 p-6 rounded-lg border-2 shadow-lg
                      ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border}
                      relative overflow-hidden
                    `}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-current transform translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-current transform -translate-x-12 translate-y-12"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <h2 className={`text-xl font-bold ${currentTheme.accent} mb-1`}>
                          {cardData.name}
                        </h2>
                        <p className="text-sm opacity-90 mb-1">{cardData.title}</p>
                        <p className={`text-sm font-semibold ${currentTheme.accent}`}>
                          {cardData.company}
                        </p>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="opacity-70">📞</span>
                          <span>{cardData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="opacity-70">✉️</span>
                          <span>{cardData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="opacity-70">🌐</span>
                          <span>{cardData.website}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="opacity-70">📍</span>
                          <span className="text-xs leading-tight">{cardData.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-black">
              <CardContent className="pt-6">
                <h3 className="font-bold text-black mb-3">Quick Tips:</h3>
                <ul className="text-sm text-black space-y-2 font-bold">
                  <li>• Standard business card size: 3.5" × 2" (89mm × 51mm)</li>
                  <li>• PNG format is perfect for digital use</li>
                  <li>• PDF format is ideal for professional printing</li>
                  <li>• Try different themes to match your brand</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}