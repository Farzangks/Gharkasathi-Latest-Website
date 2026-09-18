import React, { useState, useEffect } from 'react';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ShieldCheck, 
  Check, 
  X, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  Play, 
  FileText, 
  HelpCircle,
  RefreshCw,
  QrCode,
  Share2,
  Lock,
  ChevronDown
} from 'lucide-react';
import { 
  LiveProvider, 
  TrainingCourse, 
  TrainingModule, 
  TrainingLesson, 
  QuizQuestion, 
  TrainingProgress, 
  PartnerCertificationItem 
} from '../types';
import { ACADEMY_COURSES } from '../data/academyCourses';
import { CsgspCertificateModal } from './CsgspCertificateModal';

interface PartnerAcademyViewProps {
  partner: LiveProvider;
  onPartnerUpdated?: () => void;
}

export const PartnerAcademyView: React.FC<PartnerAcademyViewProps> = ({
  partner,
  onPartnerUpdated
}) => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [courses, setCourses] = useState<TrainingCourse[]>(ACADEMY_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(ACADEMY_COURSES[0].id);
  const [progressList, setProgressList] = useState<TrainingProgress[]>([]);
  const [certificates, setCertificates] = useState<PartnerCertificationItem[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(false);

  // Active Lesson Reader State
  const [activeLesson, setActiveLesson] = useState<TrainingLesson | null>(null);
  const [activeModuleTitle, setActiveModuleTitle] = useState<string>('');
  const [completingLesson, setCompletingLesson] = useState(false);

  // Active Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<any | null>(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  // Certificate Modal State
  const [viewingCertificate, setViewingCertificate] = useState<PartnerCertificationItem | null>(null);

  const fetchPartnerProgress = async () => {
    if (!partner?.id) return;
    setLoadingProgress(true);
    try {
      const res = await fetch(`/api/academy/partner/${partner.id}/progress`);
      if (res.ok) {
        const data = await res.json();
        setProgressList(data.progress || []);
        setCertificates(data.certificates || []);
      }
    } catch (err) {
      console.error('Failed to load partner academy progress:', err);
    } finally {
      setLoadingProgress(false);
    }
  };

  useEffect(() => {
    fetchPartnerProgress();
  }, [partner?.id]);

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const courseProgress = progressList.find(p => p.courseId === selectedCourse.id);
  const completedLessonIds = courseProgress?.completedLessonIds || [];
  
  const allLessonIds = selectedCourse.modules.flatMap(m => m.lessons.map(l => l.id));
  const completedCount = allLessonIds.filter(id => completedLessonIds.includes(id)).length;
  const progressPercent = Math.round((completedCount / allLessonIds.length) * 100);
  const isAllLessonsDone = completedCount === allLessonIds.length;

  const handleEnroll = async (courseId: string) => {
    try {
      const res = await fetch(`/api/academy/partner/${partner.id}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });
      if (res.ok) {
        fetchPartnerProgress();
        if (onPartnerUpdated) onPartnerUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteLesson = async (lessonId: string) => {
    setCompletingLesson(true);
    try {
      const res = await fetch(`/api/academy/partner/${partner.id}/lesson-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          lessonId
        })
      });
      if (res.ok) {
        await fetchPartnerProgress();
        if (onPartnerUpdated) onPartnerUpdated();
        setActiveLesson(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompletingLesson(false);
    }
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = async () => {
    setSubmittingQuiz(true);
    try {
      const res = await fetch(`/api/academy/partner/${partner.id}/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          answers: quizAnswers
        })
      });

      const data = await res.json();
      if (res.ok) {
        setQuizResult(data);
        if (data.certificate) {
          setViewingCertificate(data.certificate);
        }
        await fetchPartnerProgress();
        if (onPartnerUpdated) onPartnerUpdated();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  // Determine user journey step
  const journeySteps = [
    { key: 'registered', labelEn: 'Registered', labelHi: 'पंजीकृत' },
    { key: 'kyc_verified', labelEn: 'KYC Verified', labelHi: 'केवाईसी सत्यापित' },
    { key: 'professionally_verified', labelEn: 'Skill Verified', labelHi: 'कौशल सत्यापित' },
    { key: 'training_assigned', labelEn: 'Training', labelHi: 'ट्रेनिंग' },
    { key: 'assessment_passed', labelEn: 'Assessment', labelHi: 'मूल्यांकन' },
    { key: 'certified', labelEn: 'CSGSP Certified', labelHi: 'प्रमाणित साथी' }
  ];

  const currentStepIndex = journeySteps.findIndex(s => s.key === partner.journeyStatus);
  const activeStepIdx = currentStepIndex >= 0 ? currentStepIndex : 0;

  return (
    <div className="space-y-4 text-white">
      
      {/* Top Banner: CSGSP Credential Header */}
      <div className={`p-4 rounded-2xl border transition-all ${
        partner.isCsgspCertified
          ? 'bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/60 border-amber-600/70 shadow-lg'
          : 'bg-stone-900/80 border-stone-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${
              partner.isCsgspCertified
                ? 'bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 border border-amber-300'
                : 'bg-stone-800 text-stone-400 border border-stone-700'
            }`}>
              <Award className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  partner.isCsgspCertified
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40'
                    : 'bg-stone-800 text-stone-400'
                }`}>
                  {partner.isCsgspCertified 
                    ? (lang === 'hi' ? 'प्रमाणित कुशल साथी (CSGSP)' : 'Certified Skilled Gharkasathi Service Partner') 
                    : (lang === 'hi' ? 'प्रमाणन लंबित' : 'Certification In Progress')}
                </span>
                {partner.isCsgspCertified && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </div>

              <h2 className="text-base font-bold text-white mt-0.5">
                {partner.name}
              </h2>

              <div className="text-xs text-stone-400 mt-0.5">
                {partner.isCsgspCertified ? (
                  <span>
                    Trade License: <strong className="text-amber-300">{partner.certifiedCategories.join(', ') || partner.skills[0]}</strong> &bull; Valid across Raipur &amp; Bhilai
                  </span>
                ) : (
                  <span>
                    Complete training modules &amp; pass skill assessment to unlock CSGSP certified badge.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bilingual Switch & View Cert Button */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-0.5 rounded-lg bg-stone-950 border border-stone-800">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  lang === 'hi' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {partner.isCsgspCertified && certificates[0] && (
              <button
                onClick={() => setViewingCertificate(certificates[0])}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'प्रमाणपत्र देखें' : 'View Certificate'}</span>
              </button>
            )}
          </div>

        </div>

        {/* 6-Step Visual Journey Stepper */}
        <div className="mt-4 pt-3 border-t border-stone-800/80">
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
            {lang === 'hi' ? 'आपकी प्रमाणन प्रगति (Certification Milestone):' : 'Your Certification Journey:'}
          </div>

          <div className="grid grid-cols-6 gap-1.5 text-center text-[10px]">
            {journeySteps.map((step, idx) => {
              const isDone = idx < activeStepIdx || partner.isCsgspCertified;
              const isCurrent = idx === activeStepIdx && !partner.isCsgspCertified;
              return (
                <div
                  key={step.key}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isDone
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300 font-bold'
                      : isCurrent
                        ? 'bg-amber-950/60 border-amber-600 text-amber-300 font-bold animate-pulse'
                        : 'bg-stone-950/40 border-stone-800 text-stone-500'
                  }`}
                >
                  <div className="text-[8px] font-mono">STEP {idx + 1}</div>
                  <div className="truncate mt-0.5">{lang === 'hi' ? step.labelHi : step.labelEn}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Academy Content: Course Selector & Content Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Course Cards / Trade Selector */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
            {lang === 'hi' ? 'पाठ्यक्रम सूची (Courses):' : 'Academy Courses:'}
          </div>

          {courses.map(course => {
            const isSelected = course.id === selectedCourseId;
            const p = progressList.find(prog => prog.courseId === course.id);
            const isPassed = p?.status === 'assessment_passed';
            return (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setActiveLesson(null);
                  setQuizActive(false);
                  setQuizResult(null);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-600 text-white shadow-xs'
                    : 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    {course.category.toUpperCase()}
                  </span>
                  {isPassed ? (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {lang === 'hi' ? 'उत्तीर्ण' : 'Passed'}
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-400">
                      {course.estimatedHours}h
                    </span>
                  )}
                </div>

                <div className="font-bold text-xs mt-1 text-white">
                  {lang === 'hi' ? course.titleHi : course.titleEn}
                </div>

                <div className="flex items-center justify-between text-[10px] text-stone-400 mt-2 pt-2 border-t border-stone-800/60">
                  <span>{course.modules.length} Modules</span>
                  <span>{course.passingScore}% Pass mark</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center / Right: Course Modules or Active Lesson Reader or Quiz */}
        <div className="lg:col-span-8 bg-stone-900 rounded-2xl border border-stone-800 p-4 sm:p-5 space-y-4">
          
          {/* Active Lesson Reader View */}
          {activeLesson ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase">
                    {activeModuleTitle}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {lang === 'hi' ? activeLesson.titleHi : activeLesson.titleEn}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveLesson(null)}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                >
                  {lang === 'hi' ? 'वापस' : 'Back'}
                </button>
              </div>

              {/* Lesson Rich Content Reader */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3 text-xs text-stone-300 leading-relaxed">
                <div className="text-sm font-semibold text-stone-100">
                  {lang === 'hi' ? 'प्रक्रियात्मक निर्देश (Procedural Protocol):' : 'Standard Operating Protocol:'}
                </div>
                <p>
                  {lang === 'hi' ? activeLesson.contentHi : activeLesson.contentEn}
                </p>

                {/* Key Checklist / Do's & Don'ts */}
                <div className="mt-3 p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-2">
                  <div className="font-bold text-amber-400 text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'hi' ? 'सुरक्षा और गुणवत्ता चेकलिस्ट:' : 'Gharkasathi Quality & Safety Check:'}</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Always inform the customer before turning off main water or electrical supply.</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Wear official Gharkasathi badge &amp; clean uniform at all times on site.</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Take before-and-after photo verification via partner camera.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Action Footer */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-stone-400 font-mono">
                  {activeLesson.durationMinutes} min estimated reading
                </span>

                <button
                  onClick={() => handleCompleteLesson(activeLesson.id)}
                  disabled={completingLesson}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completingLesson ? 'Saving...' : (lang === 'hi' ? 'पाठ पूरा हुआ &bull; मार्क करें' : 'Mark Lesson Completed')}</span>
                </button>
              </div>
            </div>
          ) : quizActive ? (
            
            /* QUIZ / ASSESSMENT ENGINE */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase">
                    SKILL ASSESSMENT EXAM
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {lang === 'hi' ? selectedCourse.titleHi : selectedCourse.titleEn}
                  </h3>
                  <div className="text-xs text-stone-400">
                    Passing Threshold: <strong className="text-emerald-400">{selectedCourse.passingScore}%</strong> &bull; Total Questions: <strong>{selectedCourse.quiz.length}</strong>
                  </div>
                </div>
                <button
                  onClick={() => setQuizActive(false)}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
              </div>

              {/* Quiz Result Banner */}
              {quizResult && (
                <div className={`p-4 rounded-xl border space-y-2 ${
                  quizResult.passed 
                    ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' 
                    : 'bg-rose-950/80 border-rose-700 text-rose-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {quizResult.passed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
                      <span className="font-bold text-sm">
                        {quizResult.passed 
                          ? (lang === 'hi' ? 'बधाई! आपने मूल्यांकन पास कर लिया!' : 'Assessment Passed Successfully!')
                          : (lang === 'hi' ? 'पुनः प्रयास आवश्यक' : 'Assessment Failed - Review Required')}
                      </span>
                    </div>
                    <span className="font-mono text-base font-bold">
                      {quizResult.score}% ({quizResult.correctCount}/{quizResult.totalQuestions})
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed">
                    {quizResult.message}
                  </p>

                  {quizResult.certificate && (
                    <button
                      onClick={() => setViewingCertificate(quizResult.certificate)}
                      className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Award className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'मेरा आधिकारिक CSGSP प्रमाणपत्र देखें' : 'View Official CSGSP Certificate'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Quiz Questions List */}
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {selectedCourse.quiz.map((q, idx) => {
                  const selected = quizAnswers[q.id];
                  const hasResult = !!quizResult;
                  const isCorrect = hasResult && selected === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-2.5 text-xs"
                    >
                      <div className="font-bold text-stone-200">
                        {idx + 1}. {lang === 'hi' ? q.questionHi : q.questionEn}
                      </div>

                      <div className="space-y-1.5">
                        {(lang === 'hi' ? q.optionsHi : q.optionsEn).map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          return (
                            <div
                              key={optIdx}
                              onClick={() => !hasResult && handleSelectQuizOption(q.id, optIdx)}
                              className={`p-2.5 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                                isOptionSelected
                                  ? 'bg-amber-950/60 border-amber-600 text-amber-200 font-bold'
                                  : 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300'
                              }`}
                            >
                              <span>{opt}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isOptionSelected ? 'border-amber-400 bg-amber-500 text-stone-950' : 'border-stone-600'
                              }`}>
                                {isOptionSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {hasResult && (
                        <div className="text-[11px] text-stone-400 pt-1 border-t border-stone-800/80">
                          <strong>{lang === 'hi' ? 'विवरण:' : 'Explanation:'}</strong> {lang === 'hi' ? q.explanationHi : q.explanationEn}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Quiz Action */}
              {!quizResult && (
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-400">
                    {Object.keys(quizAnswers).length} of {selectedCourse.quiz.length} questions answered
                  </span>

                  <button
                    onClick={handleSubmitQuiz}
                    disabled={submittingQuiz || Object.keys(quizAnswers).length < selectedCourse.quiz.length}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-900/30"
                  >
                    <Award className="w-4 h-4" />
                    <span>{submittingQuiz ? 'Evaluating...' : (lang === 'hi' ? 'उत्तर सबमिट करें' : 'Submit Exam for Grading')}</span>
                  </button>
                </div>
              )}

            </div>

          ) : (

            /* COURSE OVERVIEW & MODULES ACCORDION */
            <div className="space-y-4">
              
              {/* Course Header & Progress Bar */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {lang === 'hi' ? selectedCourse.titleHi : selectedCourse.titleEn}
                  </h3>
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    {progressPercent}% {lang === 'hi' ? 'पूर्ण' : 'Completed'}
                  </span>
                </div>

                <p className="text-xs text-stone-300 mt-1">
                  {lang === 'hi' ? selectedCourse.descriptionHi : selectedCourse.descriptionEn}
                </p>

                {/* Progress Bar Line */}
                <div className="w-full bg-stone-800 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Modules & Lessons List */}
              <div className="space-y-3">
                {selectedCourse.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-200">
                      <span>Module {modIdx + 1}: {lang === 'hi' ? mod.titleHi : mod.titleEn}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{mod.lessons.length} Lessons</span>
                    </div>

                    <div className="space-y-1.5">
                      {mod.lessons.map(les => {
                        const isDone = completedLessonIds.includes(les.id);
                        return (
                          <div
                            key={les.id}
                            onClick={() => {
                              setActiveLesson(les);
                              setActiveModuleTitle(lang === 'hi' ? mod.titleHi : mod.titleEn);
                            }}
                            className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-xs flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <Play className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              )}
                              <span className={isDone ? 'text-stone-400 line-through' : 'text-stone-100 font-medium'}>
                                {lang === 'hi' ? les.titleHi : les.titleEn}
                              </span>
                            </div>

                            <span className="text-[10px] text-stone-500 font-mono">
                              {les.durationMinutes} min &bull; Read
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Assessment Unlock Call-to-Action */}
              <div className="p-4 bg-stone-950 rounded-xl border border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'कौशल परीक्षा (Skill Assessment)' : 'Official Trade Skill Assessment'}</span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    {courseProgress?.status === 'assessment_passed'
                      ? (lang === 'hi' ? 'आपने यह परीक्षा सफलतापूर्वक उत्तीर्ण कर ली है।' : 'You have passed this skill assessment with flying colors.')
                      : (lang === 'hi' ? 'सभी पाठ पूरे होने पर 10 प्रश्नों की परीक्षा दें।' : 'Answer 10 randomized trade questions. 80% passing mark required.')}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setQuizActive(true);
                    setQuizResult(null);
                    setQuizAnswers({});
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>
                    {courseProgress?.status === 'assessment_passed'
                      ? (lang === 'hi' ? 'पुनः परीक्षा दें' : 'Retake Exam')
                      : (lang === 'hi' ? 'परीक्षा शुरू करें' : 'Start Assessment')}
                  </span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* PRINTABLE / VERIFIABLE CSGSP CERTIFICATE MODAL */}
      {viewingCertificate && (
        <CsgspCertificateModal
          certificate={viewingCertificate}
          onClose={() => setViewingCertificate(null)}
          lang={lang}
        />
      )}

    </div>
  );
};
