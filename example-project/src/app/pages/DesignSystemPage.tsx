/**
 * Design System Showcase Page
 */

import { Link } from 'react-router';
import { useState } from 'react';
import styled from '@emotion/styled';
import { ArrowLeft, Search, Mail, User, Heart, Download, Trash2 } from 'lucide-react';
import {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Checkbox,
  Select,
  colors,
  spacing,
  borderRadius,
  gradients,
} from '../../design-system';

const Container = styled.div`
  min-height: 100vh;
  background: ${colors.gray50};
  padding: ${spacing[6]};
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto ${spacing[8]};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[3]} ${spacing[4]};
  background: white;
  border: 1px solid ${colors.gray200};
  border-radius: ${borderRadius.md};
  color: ${colors.gray700};
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-bottom: ${spacing[6]};

  &:hover {
    background: ${colors.gray50};
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 900;
  color: ${colors.gray900};
  margin: 0 0 ${spacing[3]} 0;
  background: ${gradients.purple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${colors.gray600};
  margin: 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${spacing[12]};
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.gray900};
  margin: 0 0 ${spacing[6]} 0;
  padding-bottom: ${spacing[3]};
  border-bottom: 2px solid ${colors.gray200};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing[6]};
`;

const ComponentShowcase = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

const ComponentGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[3]};
  align-items: center;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${spacing[4]};
`;

const ColorSwatch = styled.div<{ color: string }>`
  height: 80px;
  background: ${props => props.color};
  border-radius: ${borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-end;
  padding: ${spacing[3]};
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

export function DesignSystemPage() {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <Container>
      <Header>
        <BackButton to="/">
          <ArrowLeft size={18} />
          홈으로
        </BackButton>
        <Title>Design System</Title>
        <Subtitle>Toss-inspired Design System for Financial Platform</Subtitle>
      </Header>

      <Content>
        {/* Buttons */}
        <Section>
          <SectionTitle>Buttons</SectionTitle>
          <Grid>
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>Different button styles</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentGroup>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="gradient">Gradient</Button>
                </ComponentGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
                <CardDescription>Different button sizes</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentGroup>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </ComponentGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>States</CardTitle>
                <CardDescription>Button states</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentGroup>
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button isLoading>Loading</Button>
                </ComponentGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>With Icons</CardTitle>
                <CardDescription>Buttons with icons</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentShowcase>
                  <Button variant="primary">
                    <Download size={18} />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Heart size={18} />
                    Like
                  </Button>
                  <Button variant="danger" size="sm">
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </ComponentShowcase>
              </CardBody>
            </Card>
          </Grid>
        </Section>

        {/* Inputs */}
        <Section>
          <SectionTitle>Inputs</SectionTitle>
          <Grid>
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Text inputs</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentShowcase>
                  <Input placeholder="Basic input" />
                  <Input label="이메일" placeholder="example@email.com" />
                  <Input
                    label="검색"
                    placeholder="Search..."
                    leftIcon={<Search size={18} />}
                  />
                  <Input
                    label="사용자 이름"
                    placeholder="Username"
                    helperText="영문, 숫자만 입력 가능합니다"
                    rightIcon={<User size={18} />}
                  />
                </ComponentShowcase>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>States</CardTitle>
                <CardDescription>Input states</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentShowcase>
                  <Input placeholder="Normal" />
                  <Input placeholder="Disabled" disabled />
                  <Input
                    label="에러 상태"
                    placeholder="Error input"
                    error="이메일 형식이 올바르지 않습니다"
                  />
                  <Input
                    label="성공 상태"
                    value="success@email.com"
                    helperText="사용 가능한 이메일입니다"
                  />
                </ComponentShowcase>
              </CardBody>
            </Card>
          </Grid>
        </Section>

        {/* Badges */}
        <Section>
          <SectionTitle>Badges</SectionTitle>
          <Grid>
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>Different badge styles</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentGroup>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                </ComponentGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
                <CardDescription>Different badge sizes</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentGroup>
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </ComponentGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dot Badges</CardTitle>
                <CardDescription>Status indicators</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentGroup>
                  <Badge variant="success" dot size="sm" />
                  <Badge variant="error" dot size="md" />
                  <Badge variant="warning" dot size="lg" />
                </ComponentGroup>
              </CardBody>
            </Card>
          </Grid>
        </Section>

        {/* Form Elements */}
        <Section>
          <SectionTitle>Form Elements</SectionTitle>
          <Grid>
            <Card>
              <CardHeader>
                <CardTitle>Checkbox</CardTitle>
                <CardDescription>Checkbox components</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentShowcase>
                  <Checkbox
                    label="Checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <Checkbox label="Checked" checked />
                  <Checkbox label="Disabled" disabled />
                  <Checkbox label="Checked & Disabled" checked disabled />
                </ComponentShowcase>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
                <CardDescription>Dropdown select</CardDescription>
              </CardHeader>
              <CardBody>
                <ComponentShowcase>
                  <Select label="국가 선택">
                    <option value="">선택하세요</option>
                    <option value="kr">대한민국</option>
                    <option value="us">미국</option>
                    <option value="jp">일본</option>
                  </Select>
                  <Select label="에러 상태" error="필수 선택 항목입니다">
                    <option value="">선택하세요</option>
                  </Select>
                </ComponentShowcase>
              </CardBody>
            </Card>
          </Grid>
        </Section>

        {/* Colors */}
        <Section>
          <SectionTitle>Colors</SectionTitle>
          <ColorGrid>
            <ColorSwatch color={colors.primary600}>Primary</ColorSwatch>
            <ColorSwatch color={colors.secondary600}>Secondary</ColorSwatch>
            <ColorSwatch color={colors.success600}>Success</ColorSwatch>
            <ColorSwatch color={colors.error600}>Error</ColorSwatch>
            <ColorSwatch color={colors.warning600}>Warning</ColorSwatch>
            <ColorSwatch color={colors.gray600}>Gray</ColorSwatch>
          </ColorGrid>
        </Section>

        {/* Cards */}
        <Section>
          <SectionTitle>Cards</SectionTitle>
          <Grid>
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>Simple card with header and body</CardDescription>
              </CardHeader>
              <CardBody>
                This is a basic card component with header and body sections.
              </CardBody>
            </Card>

            <Card interactive>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see effect</CardDescription>
              </CardHeader>
              <CardBody>
                This card has hover and click effects.
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Includes footer actions</CardDescription>
              </CardHeader>
              <CardBody>
                Card content goes here.
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="outline">Cancel</Button>
                <Button size="sm">Confirm</Button>
              </CardFooter>
            </Card>
          </Grid>
        </Section>
      </Content>
    </Container>
  );
}
