import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Linkedin,
  Mail,
  GraduationCap,
  Building,
  FileText,
  Camera,
  Globe,
  BadgeCheck,
  ArrowRight,
  Info
} from 'lucide-react';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  required: boolean;
  documents?: string[];
}

const VerificationProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({});

  const verificationSteps: VerificationStep[] = [
    {
      id: 'linkedin',
      title: 'LinkedIn Profile Verification',
      description: 'Connect your LinkedIn profile to verify your professional background',
      icon: <Linkedin className="h-6 w-6" />,
      status: 'completed',
      required: true
    },
    {
      id: 'work_email',
      title: 'Work Email Verification',
      description: 'Verify your current employment with your company email address',
      icon: <Mail className="h-6 w-6" />,
      status: 'completed',
      required: true
    },
    {
      id: 'education',
      title: 'Educational Credentials',
      description: 'Upload your degree certificate or official transcript',
      icon: <GraduationCap className="h-6 w-6" />,
      status: 'in-progress',
      required: true,
      documents: ['Degree Certificate', 'Official Transcript', 'Student ID']
    },
    {
      id: 'employment',
      title: 'Employment Verification',
      description: 'Provide employment letter or company ID for current position',
      icon: <Building className="h-6 w-6" />,
      status: 'pending',
      required: false,
      documents: ['Employment Letter', 'Company ID', 'Offer Letter']
    },
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Upload government-issued ID for identity confirmation',
      icon: <FileText className="h-6 w-6" />,
      status: 'pending',
      required: false,
      documents: ['Passport', 'Driver\'s License', 'National ID']
    }
  ];

  const handleFileUpload = (stepId: string, files: FileList | null) => {
    if (files) {
      setUploadedFiles(prev => ({
        ...prev,
        [stepId]: Array.from(files)
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const renderStepCard = (step: VerificationStep) => (
    <Card key={step.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg mr-4 ${
              step.status === 'completed' ? 'bg-green-100 text-green-600' :
              step.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
              step.status === 'failed' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              {step.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center">
                {step.title}
                {step.required && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Required
                  </span>
                )}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{step.description}</p>
            </div>
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(step.status)}`}>
            {getStatusIcon(step.status)}
            <span className="ml-1 capitalize">{step.status.replace('-', ' ')}</span>
          </div>
        </div>

        {step.status === 'pending' && (
          <div className="space-y-4">
            {step.documents && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Accepted Documents:</h4>
                <div className="flex flex-wrap gap-2">
                  {step.documents.map((doc) => (
                    <span
                      key={doc}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(step.id, e.target.files)}
                className="hidden"
                id={`upload-${step.id}`}
              />
              <label
                htmlFor={`upload-${step.id}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, JPG, PNG (Max 10MB)
              </p>
            </div>

            {uploadedFiles[step.id] && uploadedFiles[step.id].length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Uploaded Files:</h4>
                <div className="space-y-2">
                  {uploadedFiles[step.id].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-900">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Submit for Review
                </button>
              </div>
            )}
          </div>
        )}

        {step.status === 'in-progress' && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <p className="font-medium text-yellow-800">Under Review</p>
                <p className="text-yellow-700 text-sm">
                  Your documents are being reviewed. This typically takes 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {step.status === 'completed' && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="font-medium text-green-800">Verified Successfully</p>
                <p className="text-green-700 text-sm">
                  This verification step has been completed successfully.
                </p>
              </div>
            </div>
          </div>
        )}

        {step.status === 'failed' && (
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <div>
                <p className="font-medium text-red-800">Verification Failed</p>
                <p className="text-red-700 text-sm">
                  Please review the requirements and resubmit your documents.
                </p>
              </div>
            </div>
            <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Retry Verification
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const completedSteps = verificationSteps.filter(step => step.status === 'completed').length;
  const totalSteps = verificationSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-blue-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900">Alumni Verification</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete the verification process to get your blue checkmark and build trust with students. 
          Verified alumni get priority in mentor matching and access to exclusive features.
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Verification Progress</h3>
            <span className="text-sm text-gray-600">{completedSteps} of {totalSteps} completed</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {progressPercentage === 100 ? 'Verification Complete!' : 'Keep going to get verified'}
            </span>
            <span className="font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>

          {progressPercentage === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-50 rounded-lg flex items-center"
            >
              <BadgeCheck className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-800">Congratulations!</p>
                <p className="text-green-700 text-sm">
                  You're now a verified alumni. Your blue checkmark will appear on your profile shortly.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Benefits of Verification */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center">
            <BadgeCheck className="h-5 w-5 text-blue-600 mr-2" />
            Benefits of Getting Verified
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Blue verification badge on your profile',
              'Higher visibility in mentor matching',
              'Access to exclusive alumni events',
              'Priority in job posting approvals',
              'Enhanced credibility with students',
              'Special alumni-only features'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Verification Steps</h3>
        <div className="space-y-4">
          {verificationSteps.map((step) => renderStepCard(step))}
        </div>
      </div>

      {/* Help Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-gray-600 mb-3">
                If you're having trouble with the verification process or have questions about required documents, 
                our support team is here to help.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationProcess;