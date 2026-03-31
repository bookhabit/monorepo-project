import { useState } from 'react';
import styled from '@emotion/styled';
import { X, Send, FileText, AlertCircle } from 'lucide-react';
import { useCSConsoleStore } from '../../store/cs-console-store';
import { useCreateConsultation, useTemplates } from '../../hooks/use-cs-console';
import { Consultation } from '../../types/cs-console';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  padding: 20px 24px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const CloseButton = styled.button`
  padding: 8px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Body = styled.div`
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const TemplateSection = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const TemplateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
`;

const TemplateButton = styled.button`
  padding: 10px 14px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
  }
`;

const Footer = styled.div`
  padding: 16px 24px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border: none;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  ` : `
    background: white;
    color: #64748b;
    border: 1px solid #e2e8f0;

    &:hover {
      border-color: #cbd5e1;
      color: #475569;
    }
  `}
`;

export function ConsultationForm() {
  const { selectedCustomerId, isConsultationFormOpen, closeConsultationForm } = useCSConsoleStore();
  const [category, setCategory] = useState<Consultation['category']>('account');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<Consultation['priority']>('medium');

  const { data: templates = [] } = useTemplates(category);
  const createMutation = useCreateConsultation();

  if (!isConsultationFormOpen || !selectedCustomerId) return null;

  const handleTemplateSelect = (templateContent: string) => {
    setContent(templateContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    await createMutation.mutateAsync({
      customerId: selectedCustomerId,
      category,
      subject: subject.trim(),
      content: content.trim(),
      priority,
    });

    // Reset form
    setCategory('account');
    setSubject('');
    setContent('');
    setPriority('medium');
    closeConsultationForm();
  };

  const handleClose = () => {
    setCategory('account');
    setSubject('');
    setContent('');
    setPriority('medium');
    closeConsultationForm();
  };

  return (
    <Overlay onClick={handleClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>신규 상담 등록</Title>
          <CloseButton onClick={handleClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <form onSubmit={handleSubmit}>
          <Body>
            <FormGroup>
              <Label>상담 카테고리</Label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value as Consultation['category'])}
              >
                <option value="account">계좌</option>
                <option value="loan">대출</option>
                <option value="card">카드</option>
                <option value="investment">투자</option>
                <option value="technical">기술지원</option>
                <option value="complaint">불만</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>우선순위</Label>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Consultation['priority'])}
              >
                <option value="low">낮음</option>
                <option value="medium">보통</option>
                <option value="high">높음</option>
                <option value="urgent">긴급</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>제목</Label>
              <Input
                type="text"
                placeholder="상담 제목을 입력하세요"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormGroup>

            {templates.length > 0 && (
              <TemplateSection>
                <TemplateHeader>
                  <FileText size={16} />
                  자주 쓰는 답변 템플릿
                </TemplateHeader>
                <TemplateGrid>
                  {templates.map(template => (
                    <TemplateButton
                      key={template.id}
                      type="button"
                      onClick={() => handleTemplateSelect(template.content)}
                    >
                      {template.title}
                    </TemplateButton>
                  ))}
                </TemplateGrid>
              </TemplateSection>
            )}

            <FormGroup>
              <Label>상담 내용</Label>
              <Textarea
                placeholder="상담 내용을 입력하세요. 템플릿을 선택하면 자동으로 입력됩니다."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormGroup>
          </Body>

          <Footer>
            <Button type="button" variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button type="submit" variant="primary" disabled={createMutation.isPending}>
              <Send size={16} />
              {createMutation.isPending ? '등록 중...' : '등록'}
            </Button>
          </Footer>
        </form>
      </Modal>
    </Overlay>
  );
}
