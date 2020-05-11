Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  namespace :api do
    namespace :v1 do
      namespace :form_manager do
        resources :templates, only: [:index, :create]
      end

      namespace :clinician do
        resources :unfilled_forms, only: [:show] do
          member do
            get "subsections/:section_id", to: "unfilled_forms#subsections"
            get "questions/:section_id", to: "unfilled_forms#questions"
            get "nested_questions/:question_id", to: "unfilled_forms#nested_questions"
          end
        end

        resources :patients, only: [:show, :index] do
          member do
            get :filled_forms
          end
          collection do
            post :search
          end
        end

        resources :filled_forms, only: [:index, :show, :create, :update] do
          member do
            get :answers
            post :complete
          end

          collection do 
            get :completed
          end
        end
      end 

      namespace :family_doctor do
        resources :filled_forms, only: [:create] do
          collection do 
            get :clinicians 
            get :unfilled_forms
          end 
        end
        resources :patients, only: [:index, :create] do 
          collection do 
            post :search
          end
        end
        resources :unfilled_forms, only: [:index]
        resources :clinicians, only: [:index]
      end
    end
  end
end
